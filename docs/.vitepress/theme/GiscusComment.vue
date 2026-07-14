<template>
  <div class="giscus-wrapper" v-if="showComment">
    <h3 class="comment-title">💬 留言交流</h3>
    <div class="giscus" ref="giscusContainer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()
const giscusContainer = ref(null)
const showComment = frontmatter.value.comment !== false

// 加载 Giscus 脚本
function loadGiscus() {
  if (!giscusContainer.value) return
  
  // 清除之前的实例
  giscusContainer.value.innerHTML = ''
  
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'myjeshurun/Soma')
  script.setAttribute('data-repo-id', 'R_kgDOSn2jKA')
  script.setAttribute('data-category', 'General')
  script.setAttribute('data-category-id', 'DIC_kwDOSn2jKM4DBJ8w')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', 'preferred_color_scheme')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('data-loading', 'lazy')
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true
  
  giscusContainer.value.appendChild(script)
}

onMounted(() => {
  loadGiscus()
})

// 切换页面时重新加载
watch(() => route.path, () => {
  nextTick(() => {
    loadGiscus()
  })
})
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
