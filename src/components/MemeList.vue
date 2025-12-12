<script setup>
import { ref } from 'vue'
import { ElScrollbar, ElEmpty } from 'element-plus'
import memesList from 'virtual-memes-list'

const emit = defineEmits(['select'])
const localImages = ref(memesList || [])

const selectImage = (imagePath) => {
  emit('select', imagePath)
}
</script>

<template>
  <div class="meme-list">
    <div class="list-header">
      <h3>📁 表情包库</h3>
      <span class="count">{{ localImages.length }}</span>
    </div>
    
    <el-scrollbar class="meme-scroll">
      <div v-if="localImages.length === 0" class="empty-state">
        <el-empty description="暂无表情包" />
      </div>
      
      <div v-else class="image-grid">
        <div 
          v-for="(item, index) in localImages" 
          :key="index"
          class="meme-item"
          @click="selectImage(item.path)"
        >
          <img 
            :src="item.path" 
            :alt="`meme-${index}`"
            class="meme-thumbnail"
          />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped>
.meme-list {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 2px solid #f0f0f0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.list-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.count {
  background: rgba(255, 255, 255, 0.3);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.meme-scroll {
  flex: 1;
}

.image-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 12px;
}

.meme-item {
  position: relative;
  cursor: pointer;
  border-radius: 6px;
  overflow: hidden;
  background: #f5f5f5;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  aspect-ratio: 1 / 1;
}

.meme-item:hover {
  border-color: #667eea;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.meme-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.item-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 11px;
  padding: 4px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #999;
}
</style>
