<script setup>
import { ElButton, ElButtonGroup } from 'element-plus'
import { Back, Right, Edit } from '@element-plus/icons-vue'

const emit = defineEmits(['undo', 'redo'])

const handleUndo = () => {
  emit('undo')
}

const handleRedo = () => {
  emit('redo')
}
</script>

<template>
  <div class="toolbar">
    <div class="toolbar-section">
      <span class="section-title">✏️ 编辑工具</span>
      <el-button-group>
        <el-button 
          type="primary" 
          @click="handleUndo"
          :icon="Back"
          size="small"
        >
          撤销
        </el-button>
        <el-button 
          type="primary" 
          @click="handleRedo"
          :icon="Right"
          size="small"
        >
          重做
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  gap: 30px;
  align-items: center;
}

.toolbar-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-title {
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-right: 5px;
}

:deep(.el-button) {
  padding: 8px 16px;
  font-size: 13px;
}
</style>
