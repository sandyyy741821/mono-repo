import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mono-repo-cu9.pages.dev', 
  base: '/blog', 
  outDir: 'dist',
  integrations: [mdx(), sitemap()],
});
