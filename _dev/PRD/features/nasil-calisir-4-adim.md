# "Nasıl Çalışır" — 4 Adım (Ana Sayfa)

## Özet

Ana sayfadaki "Nasıl çalışır" bölümü, **ajansla çalışma sürecini** anlatır. Mevcut hâli 3 adımdır (Analiz · Tespit · Otomasyon) ve **Analiz ile Tespit içerikçe örtüşür** (ikisi de "işi anlama" gibi okunur); ayrıca **ölçüm/raporlama** ayrı bir adım değil, 3. adımın (Otomasyon) kuyruğuna gömülüdür. Revize, süreci örtüşmesiz **4 adıma** çıkarır ve ölçümü ayırt edici bir adım olarak öne taşır.

**Not:** Bu bölüm *ajans sürecidir* — Crew OS sayfasındaki "platform işleyişi" 4 adımıyla (Bağla · Akış kur · Çalıştır · Ölç) karıştırılmaz; ikisi farklı süreçlerdir ama birbiriyle çelişmemelidir.

---

## Mevcut Kopya (öncesi) — `messages/*.json` → `how`

| Anahtar | Mevcut | Sorun |
|---------|--------|-------|
| `how.title` | "Üç adım, çalışan tek bir sistem." | 4 adıma çıkacak |
| `how.steps.listen` (01 **Analiz**) | "Operasyonunuzun gerçekte nasıl yürüdüğünü çıkarırız — … organizasyon şemasının dediği gibi değil, gerçekte nasılsa öyle." | **Güçlü — korunur.** Çapa cümle ("şema gibi değil, gerçekte nasılsa") bozulmaz |
| `how.steps.find` (02 **Tespit**) | "İşin nerede sızdığını buluruz: elle tekrarlanan adımlar, kaçan takipler…" | 01 ile örtüşür → 01'e eritilir |
| `how.steps.automate` (03 **Otomasyon**) | "…Crew OS içinde 7/24 çalışan otomasyona bağlarız — **ve kazancı ölçebilmeniz için sayıları size veririz.**" | Ölçüm kuyruğu buradan çıkar → 04 olur |

---

## Kullanıcı Senaryoları

- Ziyaretçi bölümde ilerledikçe (GSAP ScrollTrigger + Living Flow motifli bağlayıcı) ajansla çalışmanın **dört net aşamasını** sırayla görür: ne yaptığınızı analiz → çözümü tasarlama → otomasyona bağlama → kazancı raporlama.
- Her adımın altındaki açıklama, "ne olduğunu" tek cümlede somut ve çıktı-odaklı anlatır (jenerik değil).

---

## Davranış Kuralları

**Dört adım, örtüşmesiz — adlar KARARLAŞTI: Analiz · Çözüm · Otomasyon · Raporlama** (REVIZE-BACKLOG A4; prd-refine 2026-06-28). Aşağıdaki gövdeler **taslak/yön**dür; final TR yazımı execution'da:

  1. **Analiz** — İşin gerçekte nasıl yürüdüğünü çıkarır, tekrarlayan işin zamanı/parayı **nerede sızdırdığını** buluruz. *(eski 01 Analiz + 02 Tespit'i tek net adımda birleştirir; mevcut güçlü "şema gibi değil, gerçekte nasılsa" çapası korunur)*
  2. **Çözüm** — Neyin nasıl otomatikleşeceğini tasarlarız: hangi akış, hangi kanal, hangi onay zinciri. *(şu an karşılığı YOK — gerçekten eklenen adım)*
  3. **Otomasyon** — Bu akışları Crew OS'ta 7/24 çalışan otomasyona bağlarız. *(ölçüm kuyruğu buradan çıkar)*
  4. **Raporlama** — Ne kazandırdığını sayılarla gösterir, zayıf adımları sürekli iyileştiririz. *(ölçüm = ayırt edici taraf; artık kendi adımı)*

- Başlık `how.title` "Üç adım…" → **"Dört adım…"** olarak güncellenir.
- Adım açıklamaları **zenginleştirilir** (mevcut ~15 kelimelik sığ açıklamalardan daha doyurucu, ama yine de sade).
- **Yasak:** zayıf/edilgen adım adı ("Dinle/Listen" vb.). Adlar eylem ve çıktı çağrıştırır.
- Crew OS sayfasındaki platform 4-adımıyla **tutarlı** kalır (çelişen ifade yok); o sayfaya dokunulmaz.
- Scroll koreografisi ve Living Flow bağlayıcı motifi korunur; reduced-motion'da animasyonsuz okunur kalır.

**Uygulama notu (execution):** i18n anahtarları `listen`/`find`/`automate` legacy adlar; 4. adım için yeni anahtar eklenir (örn. `report`). Anahtar yeniden adlandırması zorunlu değil ama yapılırsa 5 dilde senkron yapılır (TR tek kaynak, çeviri versiyon-sınırında — VIZYON §5).

---

## İlişkili Feature'lar

- `crew-os-bolumu.md` — 3. adım "Otomasyon"un yaşadığı yer.
- `kopya-revizesi.md` — adım adları ve açıklamaları marka sesine tabidir (F1).

---

## Açık Sorular

- _(Adım adları karara bağlandı: Analiz · Çözüm · Otomasyon · Raporlama. Açık soru kalmadı; final gövde kopyası execution'da yazılır.)_
