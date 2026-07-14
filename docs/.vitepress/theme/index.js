import DefaultTheme from 'vitepress/theme'
import { inBrowser } from 'vitepress'
import Layout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }) {
    // 在浏览器端注入 Vercount 脚本
    if (inBrowser) {
      const script = document.createElement('script')
      script.defer = true
      script.src = 'https://vercount.one/js'
      document.head.appendChild(script)
    }
  }
}
