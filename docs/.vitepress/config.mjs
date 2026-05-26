import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "林木",
  description: "龙虾牧师 · 林木的文字工作坊",
  base: '/',
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    siteTitle: "林木",
    nav: [
      { text: '首页', link: '/' },
      { text: '归档', link: '/archives' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/myjeshurun/Soma' }
    ],
    footer: {
      message: '用 Obsidian 写作，VitePress 发布',
      copyright: '© 2026 林木'
    }
  }
})
