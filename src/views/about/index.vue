<template>
  <h3>BpmnViewer：显示静态图</h3>
  <h3>BpmnNavigatedViewer：显示静态图 + 图形拖拽</h3>
  <h3>Modeler：显示静态图 + 图形拖拽 + 引入diagram-js(节点添加、删除图形)</h3>
  <div class="wrap">
    <BpmnViewer></BpmnViewer>
    <BpmnNavigatedViewer></BpmnNavigatedViewer>
  </div>
  <Modeler></Modeler>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import BpmnViewer from "./components/bpmn-viewer.vue"
import BpmnNavigatedViewer from "./components/bpmn-navigated-viewer.vue"
import Modeler from "./components/modeler.vue"

defineOptions({
  name: "AboutComponent",
})
onMounted(() => {
  console.log("about onMounted")
})
</script>

<style scoped lang="less">
.wrap {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
}
</style>
