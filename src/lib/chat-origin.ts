// `/api/chat` origin kapısı — same-origin kuralı (saf modül; DECISIONS 2026-10-02, TB-G2).
//
// Amaç: yabancı bir sitenin chatbot'u ZİYARETÇİNİN TARAYICISINDAN kullanmasını kapatmak
// (UAT 18 senaryo 23: yabancı origin'den gelen POST Groq kotasını yakabiliyordu).
// Route'tan bağımsızdır: yalnız `Headers` alır; `Request`'e, Next'e, env'e ya da log'a
// dokunmaz → Vitest node ile birim-test edilir (chat-sanitize deseni). 403 yanıtı ve red
// logu route'un işidir.
//
// Neden host listesi değil same-origin: canlıda üç host 200 dönüyor (apex, yönlendirmesiz
// `www`, `kiwi-ai-lab-v3.vercel.app`). Elle tutulan liste her yeni alias'ta bayatlar;
// "Origin'in host'u = isteğin `host`'u" kuralı bunların hepsini ve `localhost`'u listesiz
// kapsar. `x-forwarded-host`'a bilinçli olarak bakılmaz: kural isteğin kendi `host`'udur.
//
// Kural (sıra önemli):
//   1. `host` yoksa → red. İki yoldan da önce gelir (fail-closed).
//   2. `Origin` var ve `null` değilse → BELİRLEYİCİ odur: host'u (port dahil, küçük harf,
//      şema hariç) isteğin `host`'una eşit olmalı. Parse edilemeyen Origin → red. Eşleşen
//      Origin `Sec-Fetch-Site`'tan bağımsız kabul edilir; eşleşmeyen Origin'i o kurtaramaz.
//   3. `Origin` yok ya da `null` dizgesi → yalnız `Sec-Fetch-Site: same-origin` kabul.
//      `Sec-*` başlıkları tarayıcıda JS ile set edilemez (forbidden header); gizlilik ayarı
//      ya da eklenti yüzünden Origin'i düşüren meşru tarayıcıyı korur. Yedektir, birincil
//      kural değil.
//   4. Diğer her durum → red.
//
// Sınır: bu kapı yalnız TARAYICI vektörünü kapatır. curl ve benzeri istemciler iki başlığı
// da istediği gibi sahteler — o yolun kapısı Vercel WAF hız sınırıdır (6 istek / 10 dk / IP).
// İki katman birbirinin yerini tutmaz.

/** Sahte olmayan tarayıcının aynı-origin isteğinde gönderdiği `Sec-Fetch-Site` değeri. */
const SAME_ORIGIN_FETCH_SITE = "same-origin";

/**
 * İstek, chatbot'un kendi sayfasından (aynı origin) mi geliyor?
 * `true` → kapıdan geçer; `false` → route 403 döner.
 */
export function isSameOriginRequest(headers: Headers): boolean {
  // (1) host ön koşulu — Origin ve Sec-Fetch-Site yollarından önce (boş değer = yok)
  const host = headers.get("host")?.toLowerCase();
  if (!host) return false;

  // (2) Origin varsa belirleyici: host:port eşitliği (URL host'u zaten küçük harfe indirir)
  const origin = headers.get("origin");
  if (origin !== null && origin !== "null") {
    let originHost: string;
    try {
      originHost = new URL(origin).host.toLowerCase();
    } catch {
      return false;
    }
    return originHost === host;
  }

  // (3) Origin yok / `null` → yalnız tarayıcının set ettiği same-origin işareti
  return headers.get("sec-fetch-site") === SAME_ORIGIN_FETCH_SITE;
}
