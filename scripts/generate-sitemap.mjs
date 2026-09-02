#!/usr/bin/env node
/**
 * Generate sitemap.xml for Soma site after VitePress build.
 * Run after: npx vitepress build docs
 */
import { createWriteStream, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { SitemapStream } from 'sitemap'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, '..', 'docs', '.vitepress', 'dist')
const articlesDir = resolve(distDir, 'articles')
const hostname = 'https://soma.passionever.cn'
const outPath = resolve(distDir, 'sitemap.xml')

const sitemap = new SitemapStream({ hostname })

// Core pages
sitemap.write({ url: '/', changefreq: 'weekly', priority: 1.0 })
sitemap.write({ url: '/archives.html', changefreq: 'weekly', priority: 0.8 })
sitemap.write({ url: '/404.html', changefreq: 'never', priority: 0.1 })

// All articles from the articles directory
import { readdirSync } from 'fs'
const files = readdirSync(articlesDir)
for (const file of files) {
  if (file.endsWith('.html')) {
    sitemap.write({ url: `/articles/${file}`, changefreq: 'monthly', priority: 0.9 })
  }
}

sitemap.end()

const writeStream = createWriteStream(outPath)
sitemap.pipe(writeStream)

await new Promise((resolve, reject) => {
  writeStream.on('finish', () => {
    console.log(`✅ sitemap.xml generated: ${outPath}`)
    resolve()
  })
  writeStream.on('error', reject)
})
