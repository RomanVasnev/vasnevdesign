# vasnev.art

Портфолио Романа Васнёва на [Astro](https://astro.build). Публикуется на GitHub Pages: каждый пуш в `main` собирается и выкладывается автоматически (`.github/workflows/deploy.yml`).

## Команды

```bash
npm install      # один раз после клонирования
npm run dev      # локальный сайт на http://localhost:4321 с автообновлением
npm run build    # сборка в dist/
npm run preview  # посмотреть собранный dist/
```

## Где что лежит

- `src/pages/index.astro` — главная: порядок блоков, подключение стилей и скриптов.
- `src/layouts/Base.astro` — `<head>`: мета, шрифты, Яндекс Метрика.
- `src/components/` — блоки страницы: `Nav`, `Hero` (+ `Assistant`), `About`, `Interlude`, `Approach`, `Experience`, `Cases`, `UiLibrary`, `Contacts`, `Footer`, `Loader`, `CookieBanner`.
- `src/styles/` — CSS в исходном порядке; `overrides.css` — поздние правки v56–v64, перекрывают всё, что выше.
- `src/scripts/` — JS страницы, подключается как есть и в том же порядке (`cases.js` — данные и страницы кейсов, `ui-library.js` — UI Library, `assistant*.js` — чат).
- `public/` — файлы без обработки: `img/`, `ui/` (компоненты), `fonts/`, `assistant/`, `privacy/`, `CNAME`.
- `api/`, `yc-function/` — серверная часть ИИ-чата (в сборку сайта не входит; функция в Яндекс Облаке обновляется отдельно, архив — `sh yc-function/build.sh`).
