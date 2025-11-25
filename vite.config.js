import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'

// Plugin to generate meme list
const memesListPlugin = {
  name: 'memes-list',
  resolveId(id) {
    if (id === 'virtual-memes-list') {
      return id
    }
  },
  load(id) {
    if (id === 'virtual-memes-list') {
      const memeBasePath = path.resolve(__dirname, 'src/assets/meme-base')
      try {
        const files = fs.readdirSync(memeBasePath)
          .filter(f => /\.(webp|jpg|jpeg|png)$/i.test(f))
          .sort()
          .map((f, i) => ({
            name: `表情 ${i + 1}`,
            path: `/src/assets/meme-base/${f}`,
            filename: f
          }))
        return `export default ${JSON.stringify(files)}`
      } catch (e) {
        console.error('Failed to read meme-base:', e)
        return 'export default []'
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), memesListPlugin],
})
