# TASK-3.05: S2 — Tam TR Yolculuğu (top→bottom)

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Bölüm varlığı & sırası (curl+grep)**
  - TR home'da sırayla: Hero → HowItWorks → SectorSolutions → Bunker (Crew OS) → Forum → Chatbot → Credibility → Footer render (boş bölüm yok).
  - HowItWorks **4 adım**: başlık "Dört adım…" + Analiz · Çözüm · Otomasyon · Raporlama (R1).

- [ ] **2. Hero ikincil CTA**
  - Etiket net ("İşleyen örnekleri gör" / "Çözümleri gör" — R4/F6, "Canlı gör" belirsizliği giderildi) + hedef `#sectors` **(repo:** Hero.tsx:77**).**

- [ ] **3. Anchor & nav hedefleri (Playwright)**
  - nav linkleri + CTA'lar geçerli id'lere gidiyor: `#how #sectors #bunker #forum #chat`. Tıkla → doğru bölüme scroll.

- [ ] **4. Sektör / Alpfit çıkışları**
  - gym paneli tek-otomasyon deseninde (R2: kaçan üye → WhatsApp teklif/PT → takip). "Canlı — Alpfit" rozeti (dürüst canlı gösterge) + Alpfit CTA `/spor-salonu-yazilimi`'ne gidiyor (**çıkış-link doğruluğu**; alt sayfa derin denetlenmez).

- [ ] **5. Kopuk link taraması**
  - Home'daki tüm iç `<a href>` / `<Link>` hedefleri çözülüyor (curl ile 200/308).

- [ ] **6. Triyaj (TK6)** — a11y/perf açığı çıkarsa record-not-fix.

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

- [ ] TR home tüm bölümler sırayla render (boş bölüm yok); HowItWorks 4 adım.
- [ ] Hero ikincil CTA etiketi net + `#sectors` hedefi.
- [ ] Tüm anchor/nav hedefleri (Playwright) doğru bölüme gidiyor.
- [ ] gym paneli tek-otomasyon deseninde; Alpfit CTA `/spor-salonu-yazilimi` → 200.
- [ ] Kopuk iç link yok.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** ⬜ Bekliyor

---

**Oluşturulma:** 2026-06-29
