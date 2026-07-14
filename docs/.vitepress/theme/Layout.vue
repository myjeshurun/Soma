<template>
  <Layout>
    <template #doc-before>
      <div class="page-stats" v-if="isArticlePage">
        <span class="stat-item">
          📖 本文字数：约 <strong>{{ wordCount }}</strong> 字
        </span>
        <span class="stat-item">
          👁️ 阅读量：<strong><span id="busuanzi_value_page_pv">--</span></strong> 次
        </span>
      </div>
    </template>
    <template #doc-after>
      <GiscusComment />
    </template>
  </Layout>
</template>

<script setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import GiscusComment from './GiscusComment.vue'

const { Layout } = DefaultTheme
const { page } = useData()
const route = useRoute()

// 仅在文章页面（/articles/ 路径）显示统计
const isArticlePage = computed(() => {
  return route.path.startsWith('/articles/')
})

// 估算中文字数（去除 HTML/Markdown 语法）
const wordCount = computed(() => {
  const content = page.value.content || ''
  // 移除 frontmatter
  const body = content.replace(/^---[\s\S]*?---\n*/, '')
  // 移除 markdown 链接标记、图片标记
  const clean = body
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1')
    .replace(/[#*`>|~-]/g, '')
  // 只计算中文字符
  const chinese = (clean.match(/[\u4e00-\u9fff]/g) || []).length
  return chinese
})
</script>

<style scoped>
.page-stats {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding: 0.75rem 0;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
}
.stat-item {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}
</style>
