import { defineConfig } from 'vitepress'

const siteUrl = 'https://soma-9y2.pages.dev'
const siteName = 'Soma · 林木'
const siteDesc = '龙虾牧师 · 林木的文字工作坊——身体神学、教会沉思与生命轨迹。探讨道成肉身的身体维度，AI时代的信仰反思。'
const logoUrl = `${siteUrl}/%E9%BE%99%E8%99%BE%E7%89%A7%E5%B8%88Lobster%20Pastor_logo.jpg`

// JSON-LD: WebSite + Organization + Person (graph)
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: siteName,
      alternateName: '林木',
      url: siteUrl,
      description: siteDesc,
      inLanguage: 'zh-CN',
      publisher: {
        '@type': 'Organization',
        name: siteName,
        url: siteUrl,
        logo: { '@type': 'ImageObject', url: logoUrl }
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/?q={search_term_string}` },
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@type': 'Organization',
      name: siteName,
      alternateName: '林木',
      url: siteUrl,
      description: siteDesc,
      logo: { '@type': 'ImageObject', url: logoUrl },
      foundingDate: '2025',
      sameAs: ['https://github.com/myjeshurun/Soma']
    },
    {
      '@type': 'Person',
      name: '龙虾牧师',
      alternateName: '林木',
      description: '神学工作者，22年牧职经历，现专注写作与AI时代的信仰探索。',
      url: siteUrl,
      knowsAbout: ['身体神学', '教会沉思', 'AI与信仰', '生命轨迹']
    }
  ]
}

export default defineConfig({
  title: '林木',
  description: siteDesc,
  base: '/',
  lang: 'zh-CN',
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    // Canonical
    ['link', { rel: 'canonical', href: siteUrl }],
    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: siteName }],
    ['meta', { property: 'og:title', content: siteName }],
    ['meta', { property: 'og:description', content: siteDesc }],
    ['meta', { property: 'og:url', content: siteUrl }],
    ['meta', { property: 'og:image', content: logoUrl }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: siteName }],
    ['meta', { name: 'twitter:description', content: siteDesc }],
    ['meta', { name: 'twitter:image', content: logoUrl }],
    // RSS feed
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: `${siteName} RSS`, href: '/feed.xml' }],
    // JSON-LD structured data (homepage)
    ['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd)]
  ],
  themeConfig: {
    siteTitle: '林木',
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
