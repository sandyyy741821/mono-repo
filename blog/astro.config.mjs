import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://b7eb926f.mono-repo-cu9.pages.dev', 
  base: '/blog', 
  outDir: 'dist',
  integrations: [mdx(), sitemap()],
});
