# KICKOFF-NOTES — Re-Kickoff Kararları (v0.2 → v0.3 geçişi)

> Bu dosya `/devflow:kickoff` (re-kickoff, 2026-07-02) oturumunda alınan kararların kaydıdır.
> Sonraki oturum `/devflow:kickoff-docs` bu dosyayı okuyup doküman güncellemelerini uygular.
> Uygulama bitince bu dosya mezun edilir (kickoff-docs/kickoff-verify sonrası silinir).

**Mod:** Re-kickoff — **versiyon geçişi** (v0.2 tamamlandı → v0.3 belirlendi). Klasik "PRD değişikliği delta"sı değil: prd-review (v0.2) **PRD delta üretmedi**.

---

## 1. Değişiklik Analizi (neyin değiştiği)

- **v0.2 tamamen tamamlandı** — içerik fazları 4 (a11y 89→100 çift-tema) · 5 (test altyapısı + CI) · 6 (mobil perf 84→90, LCP −12%) · 7 (Umami E1, kod-tarafı) + versiyon-sonu fazları 8 (alt-sayfa derin a11y) · 9 (senaryo testi, UAT 14/14).
- **prd-review (v0.2) → PRD delta YOK.** Vizyon/taksonomi/feature'lar doğrulandı, gerilim doğmadı. Tek çıktı: `ILKELER.md` #2(b) gerçekliğe hizalandı (a11y ≥100 ulaşıldı = yeni taban; perf/LCP brief bütçesi lab'da açık → gerçek-cihaz/Vercel field'a bağlandı, hedef düşmedi).
- **Sonuç:** MODULE-MAP feature satırları ve PHASES tablosu güncel; re-kickoff'un modül/faz güncelleme işi minimal. Asıl iş = sıradaki versiyonu belirlemek.

---

## 2. Bekleyen Operasyonel Aksiyon (v0.3'ten ÖNCE)

**v0.2 production release** — revize branch'i (`revize/devflow-kurulum`) `main`'in **120 commit önünde**; tüm revize (v0.1 + v0.2) canlıya **hiç çıkmadı**.

- **Karar:** Önce v0.2 yayınlanır (main merge), sonra v0.3 temiz zeminden başlar. *(Kullanıcı onayı 2026-07-02.)*
- Merge sonrası kapanacaklar: **Umami E1 canlı doğrulaması** (kiwiailab.com panelinde +1 → MODULE-MAP E1 🟡→✅, `phases/PHASE-7.md`) + genel canlı duman testi.
- Bu **ayrı bir operasyonel oturum** — kickoff-docs'un işi değil; ama DURUM/SESSION-NOTES'ta "v0.3 içerik fazlarından önce yapılacak release" olarak görünür kalmalı.
- Kanıt-disiplini (memory Süreç Disiplinleri): canlı +1 iddiası panel/HTML kanıtına bağlanır; `git merge-base --is-ancestor <sha> origin/main` ile merge teyit edilir — sahte-geçmiş kaydı yok.

---

## 3. v0.3 Kararı: Görsel & Etkileşim Cilası

**Tema:** Görsel & etkileşim cilası (+ URL taksonomisi/SEO). *(Kullanıcı onayı 2026-07-02.)*

**Gerekçe:** Craft en üst eksen (ILKELER); VERSIONS.md'de en çok işaretlenen aday; v0.1 (içerik) → v0.2 (a11y/perf/teknik) → v0.3 (görsel cila) doğal ilerleme.

### Kapsam (iş birimleri)

| Kalem | Ne | Modül | Not |
|-------|-----|-------|-----|
| **A1** | Logo hizalama (sol-üst düzgün oturmuyor) | M3 (Nav/PageHeader) | Saf görsel/CSS |
| **A3** | CTA kartı affordance (Alpfit/Crew OS kartları — zaten `<Link>`, sorun görsel) + scroll/"kaydır" göstergesi ölçekleme | M2 (Hero) + M3 | Saf görsel/CSS |
| **B1** | Living Flow yeşil nabız kapsamı — sayfanın aşağısına taşıma | M1 | ⚠️ **Craft-duyarlı, imza riski**. **Karar-gate'li** (kullanıcı onayı): discuss/research'te değerlendir; imza/okunabilirlik/reduced-motion/perf riski kanıtlanırsa Faz 6'daki P2 gibi **iptal edilebilir** |
| **SEO** | `/bunker-os`→`/crew-os` (route + i18n namespace `bunker`→`crew` + **kalıcı** redirect + sitemap/canonical/alternates + tüm iç linkler) & çıplak `/forum`→404 (index'siz statik bülten) | M6 + M2 + M4 | VIZYON §3 açık konu burada kapanır. **Kullanıcı onayı: v0.3'e dahil** |

### Korunan Guardrail'ler (regresyon yasağı)
- a11y=100 çift-tema (ana sayfa + 5 alt sayfa)
- Perf tabanı: masaüstü perf 100 / LCP 0.69s / CLS 0 · mobil perf 90 / LCP ~2.7s (Faz 6 tabanı)
- CLS≈0 · i18n 5-dil parite (eksik anahtar yasak) · marka sesi yasakları

### i18n Notu (kritik)
- **SEO namespace `bunker`→`crew` = yapısal anahtar değişimi** → 5 dilde (tr/en/ar/de/es) **eşzamanlı** yapılmalı (eksik anahtar = runtime hata; memory Süreç Disiplinleri). Bu değer-çevirisi değil anahtar-yeniden-adlandırma; versiyon-sınırı ertelemesi geçmez.
- Görsel kalemler (A1/A3/B1) çoğunlukla kopyaya dokunmaz → non-TR çeviri borcu düşük.

---

## 4. Modül Etkisi (kickoff-docs için)

- **M1** (Living Flow) — B1 (gate'li nabız kapsamı)
- **M2** (Sayfalar) — A3 (Hero CTA kartları/scroll göstergesi), `/crew-os` sayfası + iç linkler
- **M3** (Etkileşim/Primitives) — A1 (Nav/logo), A3 (affordance)
- **M4** (i18n) — namespace `bunker`→`crew` yapısal rename (5 dil)
- **M6** (SEO/Deploy) — kalıcı redirect, sitemap/robots/canonical/alternates, `/forum`→404

Etkilenmeyen: kapsam içi yeni feature yok; mevcut ✅ satırlar korunur, revize fazları girildikçe yeni R/görsel iş birimi satırları MODULE-MAP'e eklenir (Faz numarası discuss-phase'de damgalanır).

---

## 5. Near-Term Faz Konuları (numarasız)

> PHASES.md → "Sıradaki Fazlar" listesine eklenecek. **Numara verilmez** (faza girince discuss-phase damgalar). Kesin faz ayrımı (kaç faz) discuss-phase'de sabitlenir.

1. **Görsel cila** — A1 + A3 (saf CSS/görsel craft; en güvenli, dar). Milestone: logo hizalı + CTA kartları görsel olarak tıklanabilir + scroll göstergesi doğru ölçekli; a11y=100/perf tabanı/CLS regresyonsuz.
2. **Living Flow nabız kapsamı** — B1 (karar-gate'li). Milestone: nabız kapsamı kararı verildi (uygula VEYA iptal-kaydet); imza + reduced-motion + perf tabanı korundu.
3. **URL taksonomisi / SEO redirect** — `/crew-os` + `/forum`→404. Milestone: public `/crew-os` yayında + `/bunker-os` kalıcı redirect + i18n namespace 5-dil senkron + sitemap/canonical güncel + iç linkler temiz; SSG/build temiz.
4. *(sonra)* Versiyon-sonu sabit fazları: **teknik borç → senaryo testi → prd-review** (faza girince numara alır; Versiyon Sonu Kuralı, PHASES.md).

> Faz sırası/ayrımı kesinleşmedi — discuss-phase 1. v0.3 fazında sabitlenir (v0.2'de a11y→test→perf→Umami sırasının discuss-phase'de sabitlenmesi gibi).

---

## 6. Projeye Özgü Doküman İhtiyacı

- Yeni sabit doküman ihtiyacı **yok** (görsel cila mevcut yapıya sığar). STYLE-GUIDE ihtiyacı görsel işler derinleşirse discuss/research'te yeniden değerlendirilir.

---

## 7. kickoff-docs Yapılacaklar (özet)

1. **PHASES.md** → "Sıradaki Fazlar"a v0.3 near-term konularını ekle (numarasız; §5).
2. **VERSIONS.md** → v0.3 = "Görsel & etkileşim cilası" aktif sıradaki versiyon olarak yaz; adaylardan mezun et (görsel/SEO kalemleri v0.3'e taşındı); kalan adaylar (içerik derinleştirme+çeviri, bekleyen veri/entegrasyon) sonraki aday olarak kalır.
3. **DURUM.md** → Aktif Versiyon v0.2→**v0.3** (Versiyon Sonu Durumu `içerik_fazları`); bekleyen v0.2 production release'i görünür tut; faz döngüsü dışı (discuss-phase bekliyor).
4. **MODULE-MAP.md** → v0.3 iş birimi satırlarını (A1/A3/B1/SEO) hazır tut (Faz numarası boş — discuss-phase damgalar) VEYA discuss-phase'e bırak (kickoff-docs'ta karar).
5. **SESSION-NOTES.md** → v0.3 bağlamına güncelle (v0.2 mezun bağlamı zaten prd-review'da değişti).
6. **REVIZE-BACKLOG.md** → A1/A3/B1 + SEO redirect satırlarını "v0.3'e bağlandı" işaretle.
7. Öneri (kullanıcıya): fresh oturumda `/devflow:audit-docs` (statik doküman drift mutabakatı) — DURUM 2026-07-02 önerisi hâlâ geçerli.

---

**Kaydeden:** re-kickoff 2026-07-02 · Sıradaki adım: `/devflow:kickoff-docs` (yeni oturum).
