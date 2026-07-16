import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "林木",
  description: "龙虾牧师 · 林木的文字工作坊——身体神学、教会沉思与生命轨迹。探讨道成肉身的身体维度，AI时代的信仰反思。",
  base: '/',
  lang: 'zh-CN',
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
  ],
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
