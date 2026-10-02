// TASK-19.03 — origin kapısının ROUTE seviyesindeki sözleşmesi (TB-G2, DECISIONS 2026-10-02).
//
// Kuralın mantığı `chat-origin.test.ts`'te (saf modül). Bu dosya kuralın route'ta NEREDE
// durduğunu mühürler: POST'un ilk işi — gövde okunmadan, 503 anahtar kapısından ve sağlayıcı
// çağrısından önce. Yabancı bir origin ne anahtar durumunu (503) ne gövde doğrulama
// ayrıntısını (400) öğrenmeli.
//
// Katman: gerçek `route.ts` + gerçek `groq-sdk`; yalnız `globalThis.fetch` sahte
// (chat-route-timeout deseni — SDK `fetch`'i POST anında global'den alır). "Sağlayıcı
// çağrılmadı" = sahte fetch'e hiç gidilmedi. Sahte fetch'in gerçekten bağlı olduğunu en alttaki
// pozitif kontrol kanıtlar; o olmadan "çağrılmadı" iddiaları boş kapsamda da yeşil kalırdı.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/chat/route";

const HOST = "kiwiailab.com";
const USER_TEXT = "Spor salonum için ne yapabilirsiniz?";
const VALID_BODY = JSON.stringify({ messages: [{ role: "user", content: USER_TEXT }] });
const BROKEN_BODY = "{not json";

/** Tarayıcının aynı-origin POST'u: Origin = kendi host'umuz. Kapının asıl meşru yolu. */
const browserSameOrigin = {
  host: HOST,
  origin: `https://${HOST}`,
  "sec-fetch-site": "same-origin",
};
/** Origin'i düşen meşru tarayıcı (gizlilik ayarı/eklenti): yalnız Sec-Fetch-Site yedeği. */
const browserNoOrigin = { host: HOST, "sec-fetch-site": "same-origin" };
/** UAT 18 senaryo 23 vektörü: yabancı sitenin sayfasından, ziyaretçinin tarayıcısıyla POST. */
const foreignOrigin = {
  host: HOST,
  origin: "https://evil.example",
  "sec-fetch-site": "cross-site",
};
/** curl: tarayıcı başlıklarının hiçbiri yok. */
const curlLike = { host: HOST };

function chatRequest(headers: Record<string, string>, body = VALID_BODY) {
  return new Request(`https://${HOST}/api/chat`, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body,
  });
}

/** Başarılı tek parçalık SSE yanıtı — yalnız pozitif kontrolde gerçekten tüketilir. */
function upstreamOk() {
  return vi.fn(
    async () =>
      new Response(
        `data: ${JSON.stringify({
          id: "x",
          choices: [{ index: 0, delta: { content: "Üyelik hatırlatmalarını otomatikleştiririz." } }],
        })}\n\ndata: [DONE]\n\n`,
        { status: 200, headers: { "content-type": "text/event-stream" } }
      )
  );
}

describe("chat route — origin kapısı POST'un ilk işi (TASK-19.03)", () => {
  let fetchMock: ReturnType<typeof upstreamOk>;
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchMock = upstreamOk();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("GROQ_API_KEY", "test-key-not-real");
    warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it.each([
    ["yabancı Origin (UAT 18 senaryo 23)", foreignOrigin],
    ["Origin ve Sec-Fetch-Site yok (curl)", curlLike],
  ])("%s → 403; gövde okunmadı, sağlayıcı çağrılmadı", async (_label, headers) => {
    const req = chatRequest(headers);
    const res = await POST(req);

    expect(res.status).toBe(403);
    expect(req.bodyUsed).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("anahtar yokken yabancı Origin → 403, 503 değil (kapı anahtar kapısından önce)", async () => {
    vi.stubEnv("GROQ_API_KEY", undefined);
    const res = await POST(chatRequest(foreignOrigin));

    expect(res.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("yabancı Origin + bozuk gövde → 403, 400 değil (gövde doğrulama ayrıntısı sızmaz)", async () => {
    const req = chatRequest(foreignOrigin, BROKEN_BODY);
    const res = await POST(req);

    expect(res.status).toBe(403);
    expect(req.bodyUsed).toBe(false);
  });

  it.each([
    ["Origin = host", browserSameOrigin],
    ["Origin yok + Sec-Fetch-Site: same-origin", browserNoOrigin],
  ])("aynı-origin (%s) + anahtar yok → 503 (kapıdan geçti)", async (_label, headers) => {
    vi.stubEnv("GROQ_API_KEY", undefined);
    const res = await POST(chatRequest(headers));

    expect(res.status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(warn).not.toHaveBeenCalled();
  });

  // Canlı probe'un (TASK-19.05) kullanacağı "model çağırmayan" yol: kapıdan geçer, gövdede durur.
  it.each([
    ["Origin = host", browserSameOrigin],
    ["Origin yok + Sec-Fetch-Site: same-origin", browserNoOrigin],
  ])("aynı-origin (%s) + anahtar var + bozuk JSON → 400, sağlayıcı çağrılmadı", async (_label, headers) => {
    const res = await POST(chatRequest(headers, BROKEN_BODY));

    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(warn).not.toHaveBeenCalled();
  });

  it("red tek satırla loglanır: bir kez, yalnız karar veren üç başlık — gövde ve diğer başlıklar yok", async () => {
    await POST(
      chatRequest({ ...foreignOrigin, cookie: "session=s3cret-cookie", referer: "https://evil.example/leaked-referer-path" })
    );

    expect(warn).toHaveBeenCalledTimes(1);
    const line = warn.mock.calls[0].map(String).join(" ");
    expect(line).not.toContain("\n");
    expect(line).toContain("https://evil.example"); // origin
    expect(line).toContain(HOST); // host
    expect(line).toContain("cross-site"); // sec-fetch-site
    expect(line).not.toContain(USER_TEXT); // gövde loglanmaz
    expect(line).not.toContain("s3cret-cookie"); // başka başlık loglanmaz
    expect(line).not.toContain("leaked-referer-path"); // referer loglanmaz
  });

  it("pozitif kontrol — kapıdan geçen geçerli istek sağlayıcıya gider (sahte fetch gerçekten bağlı)", async () => {
    const res = await POST(chatRequest(browserSameOrigin));

    expect(res.status).toBe(200);
    expect(await res.text()).toBe("Üyelik hatırlatmalarını otomatikleştiririz.");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(warn).not.toHaveBeenCalled();
  });
});
