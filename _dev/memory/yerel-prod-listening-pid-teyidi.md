# Yerel prod doğrulamada serve eden process'in senin fresh process'in olduğunu listening-PID ile teyit et

Önceki oturumdan kalan stray/stale `next-server` portu tutup eski (edit-öncesi) build'i sunabilir → tüm yeni metinler "bulunamadı" görünür (**yanlış negatif**, gerçekte build doğru).

Görsel/curl doğrulamadan önce: portu dinleyen PID az önce başlattığın process mi (`ss -ltnp` / `lsof -i`), yoksa stray mı? Şüphede diskteki prerender (`.next/server/app/*.html`) build'in ground-truth'udur. Net portta yeniden başlat, sahiplenen PID'yi teyit et.

(TASK-2.01'de tam bu yaşandı.)
