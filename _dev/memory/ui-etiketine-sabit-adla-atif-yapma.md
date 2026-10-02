# Ziyaretçiye görünen bir UI etiketine i18n dışından sabit adla atıf yapma — işlevini betimle

Chatbot prompt'u, README, doküman gibi çeviri sistemine bağlı **olmayan** bir yüzeye site kopyasını (buton/menü adı) kopyalarsan iki yönlü bayatlar:

- Etiket `messages/*.json`'da değişince atıf yalan olur (ziyaretçi sayfada olmayan adı arar — dürüstlük konvansiyonu).
- Tek dilde yazıldığı için diğer dört dilde dil sızıntısı yaratır.

Tek kaynak `messages/*.json`; dışarıdan atıf **betimleyici** yapılır ("sayfadaki ücretsiz keşif görüşmesi butonu"), tırnaklı sabit ad değil.

(Chatbot SYSTEM_PROMPT'u Anthropic döneminden taşıdığı `"Book a call"` etiketiyle canlıda 5 dilde var olmayan bir butona yönlendirdi; aynı sınıf: bot/metin hitap düzeyi de o dildeki site kopyasıyla hizalanır — DE `Sie`, ES `tú`. UAT 18 senaryo 28/29, DECISIONS 2026-09-11.)
