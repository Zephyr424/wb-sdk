import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "wb-sdk",
  description: "A spaced repetition engine for vocabulary building",

  // 网站图标
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    // Google Analytics（替换为你的 GA ID）
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    `]
  ],

  // 深浅主题（默认已支持）
  appearance: true,

  themeConfig: {
    // 搜索
    search: {
      provider: 'local'
    },

    // 导航栏
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/word' },
      { text: 'Blog', link: '/blog/' },
      { text: 'GitHub', link: 'https://github.com/Zephyr424/wb-sdk' },
      { text: 'npm', link: 'https://www.npmjs.com/package/@zephyr424/wb-sdk' }
    ],

    // 侧边栏
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/guide/' },
            { text: 'Core Concepts', link: '/guide/core-concepts' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Word Management', link: '/api/word' },
            { text: 'Review Scheduling', link: '/api/review' },
            { text: 'Types', link: '/api/types' }
          ]
        }
      ],
      '/blog/': [
        {
          text: 'Blog',
          items: [
            { text: 'Why SM-2 Algorithm', link: '/blog/why-sm2' },
            { text: 'Designing wb.word API', link: '/blog/designing-api' },
            { text: 'How I Published to npm', link: '/blog/publishing-to-npm' }
          ]
        }
      ]
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Zephyr424/wb-sdk' }
    ],

    // 页脚
    footer: {
      message: 'Released under the MIT License',
      copyright: 'Copyright © 2026 Zephyr424'
    },

    // 上次更新时间
    lastUpdated: {
      text: 'Last updated'
    },

    // 贡献者展示（需要 GitHub API 支持，先配置）
    contributors: {
      avatarSize: 32
    },

    // 编辑链接（指向 GitHub）
    editLink: {
      pattern: 'https://github.com/Zephyr424/wb-sdk/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  },

  // 多语言支持 (i18n)
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN'
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/'
    }
  }
})