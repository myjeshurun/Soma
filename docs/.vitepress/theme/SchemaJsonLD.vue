<template>
  <!-- 在构建时通过 VitePress 的 useData 获取文章元数据 -->
  <component :is="'script'" :id="'schema-jsonld'" type="application/ld+json" v-html="schemaJson" />
</template>

<script setup>
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'

const { page, frontmatter } = useData()
const route = useRoute()

const schemaJson = computed(() => {
  // 只对文章页面（/articles/）输出 Schema
  if (!route.path.startsWith('/articles/')) return ''

  const title = frontmatter.value.title || page.value.title || ''
  const desc = frontmatter.value.description || frontmatter.value.摘要 || ''
  const tags = frontmatter.value.tags || []

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: desc,
    author: {
      '@type': 'Person',
      name: '龙虾牧师',
      alternateName: '林木'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Soma · 林木'
    },
    url: `https://soma.passionever.cn${route.path}`,
    datePublished: frontmatter.value.date || undefined,
    dateModified: frontmatter.value.lastUpdated || undefined,
    keywords: tags.length > 0 ? tags.join(', ') : undefined,
    inLanguage: 'zh-CN',
    about: {
      '@type': 'Thing',
      name: tags.length > 0 ? tags[0] : '神学'
    }
  }

  // 清理 undefined 字段
  Object.keys(schema).forEach(k => schema[k] === undefined && delete schema[k])

  return JSON.stringify(schema, null, 2)
})
</script>
