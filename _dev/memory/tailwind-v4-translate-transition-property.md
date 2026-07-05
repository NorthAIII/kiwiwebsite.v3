# Tailwind v4: `translate-x-*` `transform` değil `translate` property'sini kullanır

Tailwind CSS v4'te `translate-x-*` / `translate-y-*` yardımcıları, eski v3'teki gibi `transform: translateX()` **yazmaz** — bunun yerine ayrı **`translate`** CSS property'sini set eder (`--tw-translate-x` → `translate: var(...) var(...)`). Ampirik teyit (bu proje, prod build): dinlenmede `getComputedStyle(el).translate === "none"`, `group-hover:translate-x-1` aktifken hover'da `translate: "4px"` iken `transform` hep `"none"` kalır.

**Sonuç / tuzak:** Bir öğede translate hareketini **başka bir property ile birlikte** anime ederken arbitrary `transition-property` yazarsan `translate`'i **listeye eklemen** gerekir — yoksa translate anında zıplar (animasyonsuz), yalnız diğer property yumuşak geçer.

- ❌ `transition-[transform,color] group-hover:translate-x-1` → renk 300ms geçer ama ok **zıplar** (transform listede ama v4 translate'i `transform` değil).
- ✅ `transition-[translate,color] group-hover:translate-x-1` → hem kayma hem renk yumuşak. (`transitionProperty="translate, color"`, mid-transition translate ölçülebilir ~2.8px.)

**Neden site-standart idiom çalışıyor:** Sitedeki ~10 yerde kullanılan `transition-transform duration-300 group-hover:translate-x-1` (Footer, SectorSolutions, Hero ikincil CTA, Bunker vb.) sorunsuz kayar çünkü **v4'te `transition-transform` yardımcısı `transform, translate, scale, rotate`'i birlikte kapsar** (v4 genişletti). Tuzak yalnız **arbitrary** `transition-[...]` yazınca çıkar — orada `transform` yazmak translate'i kapsamaz.

**Kural:** translate hareketini + ek property (renk vb.) birlikte anime edeceksen ya site-standart `transition-transform`'a sadık kal (renk için ayrı çözüm gerekirse `transition-[translate,color]` gibi arbitrary'de translate'i açıkça listele). Emin değilsen `getComputedStyle(el).transitionProperty` + hover'da `.translate`'i gerçek tarayıcıda ölç.

(TASK-10.03 — Hero stat CTA ok idiomu; ilk yazım `transition-[transform,color]` ile zıpladı, `transition-[translate,color]`'a düzeltildi.)
