<template>
  <Layout>
    <template #doc-before>
      <div class="page-stats" v-if="isArticlePage">
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
const route = useRoute()

// 仅在文章页面（/articles/ 路径）显示统计
const isArticlePage = computed(() => {
  return route.path.startsWith('/articles/')
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
