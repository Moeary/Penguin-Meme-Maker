import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.static('public'))
app.use(express.static('dist'))
app.use('/assets', express.static('src/assets'))

// API Routes
app.get('/api/meme-list', (req, res) => {
  try {
    const memeBasePath = path.join(__dirname, 'src/assets/meme-base')
    
    if (!fs.existsSync(memeBasePath)) {
      return res.json([])
    }
    
    const files = fs.readdirSync(memeBasePath)
      .filter(file => /\.(webp|jpg|jpeg|png)$/i.test(file))
      .sort()
      .map((file, index) => ({
        name: `表情 ${index + 1}`,
        path: `/assets/meme-base/${file}`,
        filename: file
      }))
    
    res.json(files)
  } catch (error) {
    console.error('Error reading meme-base:', error)
    res.status(500).json({ error: 'Failed to read meme-base' })
  }
})

app.get('/api/memes', (req, res) => {
  res.json([])
})

// SPA fallback - serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), err => {
    if (err) {
      // If dist doesn't exist, send the source index.html
      res.sendFile(path.join(__dirname, 'index.html'))
    }
  })
})

app.listen(PORT, () => {
  console.log(`🐧 企鹅表情包制作工具正在运行 http://localhost:${PORT}`)
  console.log(`   表情包库: ${path.join(__dirname, 'src/assets/meme-base')}`)
})
