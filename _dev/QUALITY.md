# QUALITY — Kalite Eksenleri

**Amaç:** Planlama, icra ve değerlendirme aşamalarında göz önünde bulundurulacak kalite kontrol noktaları
**Ne zaman okunmalı:** Kalite eksenlerine dokunan her aşamada — araştırma ve planlama, task icrası, UAT ve faz review

---

## Kalite Eksenleri

Aşağıdaki eksenler bu proje (çok dilli, immersive tanıtım sitesi) için izlenir.

### 1. Marka & Craft Kalitesi (imza)

- Awwwards SOTD çıtası korunuyor mu? Motion timing kusursuz mu (cheapness kötü zamanlamadan sızar)?
- "Zero template smell" — şablon/page-builder hissi var mı?
- Tek güçlü imza fikir (Living Flow) öne çıkıyor, "her efekt" kalabalığı yok mu?
- Tipografi + beyaz alan restraint korunuyor mu (Fraunces/Geist, az renk)?

**Kontrol sorusu:** "Bu ekran custom-built ve canlı mı hissettiriyor, yoksa template mi kokuyor?"

### 2. Erişilebilirlik

- Semantik HTML kullanılıyor mu? Renk kontrastı yeterli mi (light & dark)?
- Klavye navigasyonu çalışıyor mu? Focus state'leri görünür mü (yeşil outline)?
- `prefers-reduced-motion` tam fallback var mı (animasyon/smooth-scroll/Living Flow statik)?
- ARIA rolleri/etiketleri doğru mu (dil menüsü, tema butonu vb.)?

**Kontrol sorusu:** "Fareyi olmayan, ekranı göremeyen veya hareket hassasiyeti olan biri bunu kullanabilir mi?" (Brief hedefi: a11y ≥100.)

### 3. Performans

- WebGL lazy + degradable mı (LCP'yi bozmuyor mu)? Asset'ler AVIF/WebP mi?
- Gereksiz re-render / çift rAF döngüsü var mı (Lenis+GSAP tek ticker)?
- Mobil/düşük güçte parçacık azalıyor mu?

**Kontrol sorusu:** "Wow efekti performansı öldürüyor mu?" (Brief hedefi: Lighthouse ≥95 perf, LCP < 2.5s, near-zero CLS.)

### 4. Yerelleştirme & RTL

- Yeni/değişen metin 5 dilde de güncellendi mi (eksik anahtar yok)?
- AR'de RTL doğru mu (layout aynalama, logical CSS prop'ları, okunabilirlik)?
- Kopya çıktı-odaklı, sade, kendinden emin mi (yasak metaforlar yok: doktor/teşhis/hekim)?

**Kontrol sorusu:** "Bu değişiklik tüm dillerde ve RTL'de tutarlı mı?"

### 5. Modülerlik & Bakım Maliyeti

- Bileşen tek sorumluluğa uyuyor mu? Token/primitive yeniden kullanılıyor mu (kopya kod yok)?
- Kod okunabilir mi? Konfigürasyon hardcode değil env/token'da mı?
- Bir bölümdeki değişiklik diğerlerini kırıyor mu?

**Kontrol sorusu:** "6 ay sonra bu parçayı bağımsız değiştirmek ne kadar zor olur?"

### 6. Hata Yönetimi & Degradasyon

- Living Flow no-WebGL/reduced-motion'da statik fallback'e düşüyor mu?
- Chatbot key yok / stream koptu durumunda zarif "offline"/fallback gösteriyor mu?
- Beklenmeyen durumlar (eksik çeviri, görsel yüklenmedi) kontrollü mü?

**Kontrol sorusu:** "Bu özellik başarısız olursa kullanıcı ne görür?"

### 7. Güvenlik (hafif — yüzey küçük)

- Chat API girdisi sanitize ediliyor mu (rol whitelist, uzunluk/geçmiş sınırı)?
- Secret'lar koda gömülü değil, env'de mi? Hata mesajları sızıntı yapmıyor mu?

**Kontrol sorusu:** "Kötü niyetli bir kullanıcı `/api/chat`'i nasıl istismar edebilir?"

### 8. Test Kapsamı (aspirasyonel — altyapı henüz yok)

- Kritik davranışlar (i18n fallback, redirect'ler, fallback yolları) doğrulanabilir mi?
- Test yazmak zor mu? (Zorsa kod çok bağımlı.)

**Kontrol sorusu:** "Bir değişiklikten sonra bir şeyin bozulup bozulmadığını nasıl bilirim?" (Not: test altyapısı kurulumu bir teknik faz adayı.)

---

## Projeye Özgü Notlar

- **Çıkarılan/hafifletilen eksenler:** Veritabanı/N+1, çok-kullanıcılı ölçeklenebilirlik bu statik site için ilgisiz; "Güvenlik" yalnızca chat API yüzeyiyle sınırlı (hafif tutulur).
- **Eklenen eksenler:** "Marka & Craft" ve "Yerelleştirme & RTL" bu projenin ayırt edici eksenleridir.

> **Öncelik sıralaması burada değil → `ILKELER.md`:** Bu doküman eksenleri *tanımlar* (ne kontrol edilir). Hangi eksenin öne geçtiği (öncelik) `ILKELER.md` → "En Yüksek Öncelikli Eksenler"de tutulur (henüz konuşulmadı).

---

## Kalite Kontrol Sonuçlarının Kaydı

Faz review'ı tamamlandığında, kalite kontrol sonuçları ilgili faz dokümanına (`phases/PHASE-X.md`) yazılır. QUALITY.md sadece eksenleri tanımlar, sonuçlar faz dokümanlarında tutulur.

---

## Kalite Eksenlerinin Kullanım Noktaları

| Aşama | Nasıl Kullanılır |
|-------|-----------------|
| **Kapsam Tartışması** | Kalite beklentileri ILKELER (öncelik eksenleri) üzerinden belirlenir — QUALITY eksenleri araştırmadan itibaren okunur/uygulanır |
| **Araştırma** | Yaklaşımlar seçilirken kalite eksenlerinin etkisi değerlendirilir |
| **Task Yazımı** | Task'ın test kriterleri ve kabul koşulları kalite eksenlerini yansıtmalı |
| **Task Çalıştırma** | Kod yazarken ilgili eksenler göz önünde tutulur |
| **UAT** | Test senaryolarında kalite beklentileri doğrulanır |
| **Faz Review** | Her kalite ekseni sistematik olarak kontrol edilir |

---

**Son Güncelleme:** 2026-06-27
