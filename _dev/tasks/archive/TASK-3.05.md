# TASK-3.05: S2 — Tam TR Yolculuğu (top→bottom)

**Durum:** ✅ Tamamlandı
**Modül:** M2 — Sayfalar & Bölümler (modules/M2-Sayfalar-Bolumler.md) (+ M3)
**Feature:** S2 — Tam TR yolculuğu (validation unit)
**Faz:** Phase 3 (phases/PHASE-3.md)
**Bağımlılıklar:** TASK-3.01 ✅ (kanonik prod serve gerekir)

---

## Hedef

TR ana sayfanın uçtan-uca yolculuğunu **birincil** olarak doğrula: Hero → ikincil CTA "İşleyen örnekleri gör" → sektörler (gym tek-otomasyon + Alpfit rozet/CTA) → 4-adım → Crew OS → Forum → Footer. CTA/nav hedefleri doğru, kopuk link / boş bölüm yok. Araç: curl+grep (link/href statik taraf) + Playwright (CTA/anchor scroll runtime taraf). Yolculuk baştan sona koşulup sonuçlar kaydedildiğinde tamamlanmış sayılır.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/modules/M2-Sayfalar-Bolumler.md` — F2.1 kompozisyon, F2.2 hero ikincil CTA (R4/F6), F2.3 4 adım (R1), F2.4 gym (R2) + Alpfit rozet
- `_dev/phases/PHASE-3.md` — Araştırma → S2 araç satırı + Dikkat (anchor hedefleri, perf/a11y record-not-fix)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu + özet
- `_dev/phases/PHASE-3.md` — Task Listesi tablosunda 3.05 durumu

---

## Alt Görevler

- [x] **1. Bölüm varlığı & sırası (curl+grep)** ✅
  - TR home'da sırayla: Hero → HowItWorks → SectorSolutions → Bunker (Crew OS) → Forum → Chatbot → Credibility → Footer render (boş bölüm yok). **Doğrulandı:** document-order id sırası `top → how → sectors → bunker → forum → chat → contact` (Credibility id'siz, chat↔contact arası — anchor hedefi değil); 8 bölümün her birinin görünür metni render (Credibility "Vaat değil, ölçüm" + Chatbot title/label/sub + Footer tagline dahil).
  - HowItWorks **4 adım** ✅: başlık `how.title`="Dört adım, çalışan tek bir sistem." + 01 Analiz · 02 Çözüm · 03 Otomasyon · 04 Raporlama (R1) — render'da 4'ü de mevcut, zayıf/edilgen ad yok.

- [x] **2. Hero ikincil CTA** ✅
  - Etiket net: `hero.ctaSecondary`="İşleyen örnekleri gör" (R4/F6, "Canlı gör" belirsizliği giderilmiş) + hedef `#sectors` **(Hero.tsx:77).** Playwright: tıkla → `#sectors` bölümü viewport top'a oturuyor (top≈0).

- [x] **3. Anchor & nav hedefleri (Playwright)** ✅
  - 8 anchor/CTA tıklandı, hepsi doğru bölüme Lenis smooth-scroll (`anchors:true`): logo→#top, nav→#how/#sectors/#bunker/#forum, nav CTA→#contact, hero ikincil→#sectors, hero birincil→#contact. İç-sayfa anchor'ları viewport top'a oturuyor (top≈0). **#contact = Footer (sayfa dibi):** scrollY=maxScroll (atBottom=true), footer tam viewport içinde (top=433/innerHeight=987) — alt-anchor'un doğal limiti, kusur değil. `#chat` id mevcut (deep-link için) ama home'da ona giden link yok — yetim hedef, kopuk değil.

- [x] **4. Sektör / Alpfit çıkışları** ✅
  - gym paneli tek-otomasyon deseninde (R2): `gyms.automation`="Kaçan üyeyi geri kazanma" + flow trigger(30 gün giriş yok)→action(WhatsApp teklif/PT)→result(takip edilir). "Canlı — Alpfit" rozeti (dürüst canlı gösterge) render. gym sekmesi default-active (`aria-pressed=true`). Alpfit çıkışları → `/spor-salonu-yazilimi`: "Uygulamayı incele" + "Canlı ürünü gör" (sektör panel) + Hero stat "Alpfit". **Runtime client-nav teyit:** "Uygulamayı incele" tıkla → `/spor-salonu-yazilimi` (Alpfit sayfası yüklendi, başlık doğru). Alt sayfa derin denetlenmedi (kapsam).

- [x] **5. Kopuk link taraması** ✅
  - Home'daki tüm iç hedefler çözülüyor (curl): `/` 200, `/spor-salonu-yazilimi` 200, `/bunker-os` 200, `/vaka-calismalari` 200, `/bulten/ai-sdr-araclari` 200, `/bulten/claude-opus-4-8-fable-5` 200. Dead `#` linki yok (Footer'da `href="#"` sosyaller filtreyle render dışı — Instagram/LinkedIn gizli, sadece X). Konsol: yolculuk boyunca 0 error/0 warning.

- [x] **6. Triyaj (TK6)** ✅ — **kapsam-içi gerçek bug YOK.** a11y/perf yüzeye çıkmadı (bu task link/anchor/render odaklı). Gözlem: browser `/`→`/ar` (önceki oturum `NEXT_LOCALE=ar` cookie kalıntısı) = S1/routing davranışı (TASK-3.02 kapsamı), S2 bulgusu değil — ortam artefaktı, cookie tr'ye set edildi.

---

## Etkilenen Dosyalar

```
(Doğrulama task'i — kaynak kod değişikliği yok.)
```

Bulgular bu task dokümanına kaydedilir; özet verify-phase'de PHASE-3 UAT'ına taşınır. İstisna: kapsam-içi bug → ayrı fix-task.

---

## Dikkat Noktaları

- **4 adım R1 kararlaştı:** başlık "Dört adım…", adımlar Analiz·Çözüm·Otomasyon·Raporlama (M2 F2.3). Crew OS sayfasının platform 4-adımıyla (Bağla/Akış kur/Çalıştır/Ölç) **çelişmez** (o sayfaya dokunulmaz).
- **Hero ikincil CTA** etiketi R4/F6 — net etiket beklenir, hedef `#sectors` (M2 F2.2).
- **Alt sayfalar derin denetlenmez** — yalnız çıkış-linkinin doğru açıldığı kontrol edilir (kapsam kararı).
- **Anchor hedefleri mevcut** `#how #sectors #bunker #forum #chat` **(repo:** SectorSolutions.tsx:46, HowItWorks.tsx:45, Bunker.tsx:19, Forum.tsx:12, Chatbot.tsx:71; nav Nav.tsx:21-24**).**
- **a11y/perf açığı** (a11y 89: marka-yeşili kontrast + `<dl>` + dil-switcher aria; mobil perf 87 / LCP 3.1s — DECISIONS 2026-06-28) çıkarsa **record-not-fix** (sahipli/ertelenmiş).
- **Ortam:** TASK-3.01 prod serve; PID fresh teyit (memory).

---

## Test Kriterleri

- [x] TR home tüm bölümler sırayla render (boş bölüm yok); HowItWorks 4 adım. ✅
- [x] Hero ikincil CTA etiketi net ("İşleyen örnekleri gör") + `#sectors` hedefi. ✅
- [x] Tüm anchor/nav hedefleri (Playwright) doğru bölüme gidiyor (8/8). ✅
- [x] gym paneli tek-otomasyon deseninde; Alpfit CTA `/spor-salonu-yazilimi` → 200 (+ client-nav teyit). ✅
- [x] Kopuk iç link yok (6/6 iç hedef 200; dead-`#` render dışı). ✅

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-29

**Durum:** ✅ Tamamlandı

**Ne yapıldı (S2 — tam TR yolculuğu, doğrulama):**
- **Ortam (kanonik):** Fresh `next build` (exit 0, temiz) → `next start -p 3100`. Memory disiplini uygulandı: önceki oturumdan **stray `next-server` PID 12708 (Jun28)** tespit edildi → temiz portta (3100) yeni serve, listening-PID **3269585 (fresh, az önce başlatılan)** `ss -ltnp` ile teyit. Load 0.81 (düşük). İş bitince kendi process'im (3269585/wrapper 3269572) kill edildi, port serbest bırakıldı — sonraki oturuma stray bırakılmadı. (Stray 12708 bana ait değil, dokunulmadı.)
- **Statik taraf (curl+grep+node):** TR home `/` (200; `/tr`→`/` 307, `as-needed` prefixsiz default). Bölüm sırası document-order `top→how→sectors→bunker→forum→chat→contact` (8 bölüm, beklenen kompozisyonla birebir). Her bölümün görünür metni render — Hero CTA'lar, 4-adım (Dört adım + Analiz/Çözüm/Otomasyon/Raporlama), sectors-sub "özellik listesi değil", gym automation+flow, "Canlı — Alpfit", Crew OS panel başlık + "Crew OS'u keşfet", Forum 2 makale, Credibility 3 kart (+ "Vaat değil, ölçüm"), Chatbot title/label/sub, Footer tagline. Kopuk link taraması: 6/6 iç hedef 200; dead-`#` render dışı (Footer filtre).
- **Runtime taraf (Playwright MCP, gerçek tarayıcı):** Lenis `anchors:true`. 8 anchor/CTA tıklandı → hepsi doğru bölüme scroll (iç-sayfa anchor'lar top≈0; #contact=Footer sayfa-dibi, atBottom=true, doğal limit). Hero ikincil CTA "İşleyen örnekleri gör"→#sectors ✓. gym default-active; "Uygulamayı incele" client-nav → `/spor-salonu-yazilimi` (Alpfit sayfası yüklendi). Konsol: 0 error / 0 warning.
- **Triyaj (TK6):** Kapsam-içi gerçek bug **yok**. Kaynak kod değişmedi. Tek gözlem: browser `/`→`/ar` (önceki oturum `NEXT_LOCALE=ar` cookie kalıntısı) = routing/S1 davranışı (TASK-3.02), S2 bulgusu değil — ortam artefaktı.

**Sonuç:** S2 tam TR yolculuğu uçtan-uca **bütünsel-tutarlı** — bölüm bütünlüğü/sırası, 4-adım, hero ikincil CTA, anchor/nav scroll, gym tek-otomasyon + Alpfit çıkışı, kopuk-link-yok hepsi GREEN. Bulgu verify-phase'de PHASE-3 UAT'ına taşınacak.

**Son Yaklaşım:** Hibrit (TK1): statik link/render → curl+grep+node; runtime anchor-scroll + client-nav → Playwright. Kanonik fresh-prod-serve + PID teyidi (TK2).

**Sonraki Adım Detayı:** Task tamam — sıradaki TASK-3.06 (S3 mod kombinasyonları / Living Flow degradasyon, Playwright). TASK-3.04'ten devreden gözlem oraya not: scroll-progress bar `origin-left` RTL yön-davranışı.

---

**Oluşturulma:** 2026-06-29
**Tamamlanma:** 2026-06-29
