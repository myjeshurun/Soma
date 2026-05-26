import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Soma",
  description: "龙虾牧师 · 林伟清的文字工作坊",
  base: '/',
  lang: 'zh-CN',
  themeConfig: {
    siteTitle: "Soma",
    nav: [
      { text: '首页', link: '/' },
      { text: '归档', link: '/archives' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/myjeshurun/Soma' }
    ],
    footer: {
      message: '用 Obsidian 写作，VitePress 发布',
      copyright: '© 2026 林伟清'
    }
  }
})
