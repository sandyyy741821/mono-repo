import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mono-repo-cu9.pages.dev',                   
  outDir: 'dist',
  host: true,
  integrations: [mdx(), sitemap()],
});
