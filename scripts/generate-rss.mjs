#!/usr/bin/env node
/**
 * Generate feed.xml (RSS 2.0) for Soma site after VitePress build.
 * Reads article markdown frontmatter to build entries.
 * Run after: npx vitepress build docs
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')
const docsDir = resolve(rootDir, 'docs')
const articlesDir = resolve(docsDir, 'articles')
const distDir = resolve(docsDir, '.vitepress', 'dist')
const hostname = 'https://soma.passionever.cn'
const outPath = resolve(distDir, 'feed.xml')

const siteTitle = 'Soma · 林木'
const siteDesc = '龙虾牧师 · 林木的文字工作坊——身体神学、教会沉思与生命轨迹。'

// Parse YAML frontmatter (minimal)
function parseFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
  if (!m) return {}
  const fm = {}
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([^:]+):\s*(.*)$/)
    if (kv) {
      let val = kv[2].trim()
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      fm[kv[1].trim()] = val
    }
  }
  return fm
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const items = []
const files = readdirSync(articlesDir).filter(f => f.endsWith('.md'))

for (const file of files) {
  const raw = readFileSync(resolve(articlesDir, file), 'utf-8')
  const fm = parseFrontmatter(raw)
  if (fm.发布 === 'false') continue
  const title = fm.标题 || file.replace(/\.md$/, '')
  const desc = fm.摘要 || ''
  const slug = file.replace(/\.md$/, '') + '.html'
  const url = `${hostname}/articles/${encodeURIComponent(slug)}`
  const date = fm.date || new Date().toISOString()
  items.push({ title, desc, url, date })
}

// Sort by date desc, newest first
items.sort((a, b) => (a.date < b.date ? 1 : -1))

const pubDate = new Date().toUTCString()
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(siteTitle)}</title>
<link>${hostname}</link>
<description>${esc(siteDesc)}</description>
<language>zh-cn</language>
<atom:link href="${hostname}/feed.xml" rel="self" type="application/rss+xml"/>
<pubDate>${pubDate}</pubDate>
<lastBuildDate>${pubDate}</lastBuildDate>
${items.map(i => `  <item>
    <title>${esc(i.title)}</title>
    <link>${i.url}</link>
    <guid isPermaLink="true">${i.url}</guid>
    <description>${esc(i.desc)}</description>
    <pubDate>${new Date(i.date).toUTCString()}</pubDate>
  </item>`).join('\n')}
</channel>
</rss>
`

writeFileSync(outPath, rss)
console.log(`✅ feed.xml generated: ${outPath} (${items.length} items)`)
