const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'SWE 2.0',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel:'stylesheet', href:'https://cdn.jsdelivr.net/npm/@mdi/font@6.6.96/css/materialdesignicons.min.css' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    nav: [
      {
        text: 'Config',
        link: '/config/'
      },
      {
        text: 'VuePress',
        link: 'https://v1.vuepress.vuejs.org'
      }
    ],
    sidebar: [
      {
        title: 'Bootcamp',
        path: '/notes/bootcamp/',
        sidebarDepth: 2,
        collapsable: false,
        children: [
          '/notes/bootcamp/objects',
          '/notes/bootcamp/classes'
        ]
      },
      {
        title: 'Module 1',
        path: '/notes/module-1/',
        sidebarDepth: 2,
        collapsable: true,
        children: [
          '/notes/module-1/react'
        ]
      },
      {
        title: 'Module 2',
        path: '/notes/module-2/',
        sidebarDepth: 2,
        collapsable: true,
        children: [
          '/notes/module-2/rest',
          '/notes/module-2/basic-auth',
          '/notes/module-2/jwt'
        ]
      },
      {
        title: 'Module 3',
        path: '/notes/module-3/',
        sidebarDepth: 2,
        collapsable: true,
        children: [
          '/notes/module-3/containerisation'
        ]
      },
      {
        title: 'Extensions',
        path: '/notes/extensions/',
        sidebarDepth: 2,
        collapsable: true,
        children: [
          '/notes/extensions/cryptography'
        ]
      }
    ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
