import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

export default defineConfig({
  site: 'https://paablobs.github.io',
  base: '/web-portfolio',
  output: 'static',
  trailingSlash: 'always',
  integrations: [react()],
})
