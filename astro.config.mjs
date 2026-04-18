// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  markdown: {
    rehypePlugins: [
      // open links in a new tab and add rel="noopener noreferrer" for security
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }] 
    ],
  },

  site: 'https://nrogers.me',
});
