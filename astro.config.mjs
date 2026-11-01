// vasnev.art: static build for GitHub Pages — by vasnev.art
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://vasnev.art',
  // the markup relies on exact spaces between inline elements, so keep it as written
  compressHTML: false,
  build: { inlineStylesheets: 'never' },
  // the CSS is a stack of passes where order matters; the minifier reorders and merges rules, so ship it as written
  vite: { build: { cssMinify: false } },
  devToolbar: { enabled: false }
});
