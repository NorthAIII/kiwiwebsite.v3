# Vercel↔GitHub Git bağlantısı sessizce kopabilir → `main` push'u deploy tetiklemez

**Belirti:** `main`'e push (merge dahil) yapılır ama Vercel Deployments listesinde **hiç yeni satır oluşmaz** (Error/Canceled bile değil — hiç). Canlı domain eski deploy'u sunmaya devam eder. v0.2 production release'te (2026-07-02) yaşandı: PR #6 merge'ü + sonraki boş commit, ikisi de sıfır deployment yarattı.

**Teşhis:** Vercel → Project **Settings → Git** → "Connected Git Repository" satırında **"Connected Nm ago"** yazar. Yeni bir zaman (örn. "5m ago") = bağlantı yakın zamanda (yeniden) kuruldu; yani önceki push'lar sırasında **kopuktu**. "Ignored Build Step" değil (o Canceled satırı üretir); webhook hiç ulaşmıyor.

**Kritik davranış:** Vercel **geriye dönük deploy etmez** — bağlantı kopukken pushlanan commit'ler, bağlantı geri gelince kendiliğinden deploy olmaz. Bağlantı yeniden kurulduktan sonra **YENİ bir commit push'lamak** gerekir. Çözüm: `git commit --allow-empty` ile boş tetikleyici commit → `main`'e push → deploy akar. (Vercel Redeploy butonu eski commit'i yeniden deploy eder, `main` HEAD'ini değil — işe yaramaz.)

**Canlı-kod-canlı doğrulaması (curl):** yeni deploy promote oldu mu? (1) Yeni build'in immutable hash'li asset'i `/_next/static/chunks/<hash>.js` → **200** (eski deploy'da 404); framework chunk'ları içerik-hash'i aynı kalırsa iki deploy'da da 200 döner (yanıltıcı — app-özel değişen chunk seç). (2) yeni koda özgü string canlı HTML'de (örn. umami `c7031c49`). (3) `/` response header `age:` düşük/0 (eski cache yüksek age). Üçünü birlikte kullan.

**Shell tuzağı (aynı release'te yanlış-pozitif verdi):** `curl ... | grep -o "pat" | head -1 && echo "VAR ✓"` **her zaman** "VAR" basar — pipeline exit code'u `head`'in exit'idir, `head` boş girdide bile 0 döner → `grep` eşleşmese de `&&` çalışır. Varlık teyidi için `grep -c` (sayı) veya `if grep -q ...; then` kullan; asla `| head -N &&` ile "gördüm" deme (kanıt disiplini — [runtime-harness-selector-teyidi](runtime-harness-selector-teyidi.md) ailesi).
