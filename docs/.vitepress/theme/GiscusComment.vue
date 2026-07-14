<template>
  <div class="giscus-wrapper" v-if="showComment">
    <h3 class="comment-title">💬 留言交流</h3>
    <Giscus
      id="comments"
      repo="myjeshurun/Soma"
      repo-id="R_kgDOSn2jKA"
      category="General"
      category-id="DIC_kwDOSn2jKM4DBJ8w"
      mapping="pathname"
      strict="0"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="bottom"
      theme="preferred_color_scheme"
      lang="zh-CN"
      loading="lazy"
    />
  </div>
</template>

<script setup>
import Giscus from '@giscus/vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

// 默认开启评论，可在每篇文章 frontmatter 中设置 comment: false 关闭
const showComment = frontmatter.value.comment !== false
</script>

<style scoped>
.giscus-wrapper {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}
.comment-title {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 600;
}
</style>
