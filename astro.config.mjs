import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://gabrielchen.me',
  output: 'static',
  integrations: [mdx()],
});
