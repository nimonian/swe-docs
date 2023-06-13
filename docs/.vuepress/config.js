import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
  lang: 'en-US',
  title: 'SWE Docs',
  description: 'A place to learn',
  // head: [['link', { rel: 'stylesheet', href: '/style.css' }]],
  theme: defaultTheme({
    logo: '/mv-symbol.png',
    logoDark: '/mv-symbol-dark.png',
    docsDir: '/docs',
    navbar: [
      {
        text: 'Frontend',
        children: [{ text: 'components', link: '/frontend/components' }]
      },
      {
        text: 'Backend',
        children: [
          { text: 'Encryption', link: '/backend/encryption' },
          { text: 'Hashing', link: '/backend/hashing' },
          { text: 'Basic Auth', link: '/backend/basic-auth' },
          { text: 'Token Auth', link: '/backend/jwt' }
        ]
      }
    ]
  })
})
