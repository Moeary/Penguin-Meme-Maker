<script setup>
import { ElButton } from 'element-plus'
import { Download, DocumentCopy } from '@element-plus/icons-vue'

defineEmits(['export', 'copy'])
</script>

<template>
  <div class="export-panel">
    <h3>📤 导出工具</h3>
    <el-button 
      type="primary" 
      @click="$emit('export')"
      :icon="Download"
      size="large"
    >
      导出 WebP
    </el-button>
    
    <el-button 
      type="info" 
      @click="$emit('copy')"
      :icon="DocumentCopy"
      size="large"
    >
      复制 JPEG
    </el-button>
  </div>
</template>

<style scoped>
.export-panel {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  padding: 16px;
  height: 100%;
}

.export-panel h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: #4a4a4a;
}

:deep(.el-button) {
  width: 100%;
}
</style>
