# DevFlow Sistemi (+ neden `.claude/` gitignore'da)

**DevFlow** = kullanıcının (Kivanç) Claude Code için özel slash-command tabanlı proje yönetim sistemi. Repo: https://github.com/36337/DevFlow (Python; `commands/devflow/*.md`, `install.sh`/`install.ps1`). Slash komutlarını `.claude/commands/devflow/` altına kurar.

Amaç: "context rot"u yenmek — her adım kendi context'iyle ayrı oturumda çalışır. PRD-güdümlü, just-in-time (organik) faz numaralandırma, repo-içi `_dev/` klasörü (PRD/, modules, MODULE-MAP) + repo kökünde `CLAUDE.md`.

İki oturum tipi, asla karışmaz: **Planlama** (faz kapsamını analiz et, task dokümanları yaz, dur) ve **Task** (tek bir task yap, bitir, dur). Tam komut akışı: `CLAUDE.md` → DevFlow Komutları.

**Neden bu public repo'da `.claude/` gitignore'da:** DevFlow özel/private bir araç, `kiwiwebsite.v3` ise public repo — bu yüzden `.gitignore`'da `.claude/` satırı var (araçlar local kalır, commit'lenmez). Buna karşılık `_dev/` dokümanları **commit'lenir** (zaten public olan `MASTER_PROMPT_v2.md` ile tutarlı). DevFlow kurulumu `revize/devflow-kurulum` branch'inde yapıldı (map-codebase, 2026-06-27).

İlgili: [Repo haritası](repo-haritasi.md).
