<template>
  <h1>静态数据渲染成流程图</h1>
  <div id="canvas"></div>
</template>

<script setup lang="ts">
import BpmnViewer from "bpmn-js"
import "bpmn-js/dist/assets/bpmn-js.css"
import pizzaDiagram from "@/assets/pizza-collaboration.bpmn?raw"

const modeler = ref()

const openDiagram = async () => {
  try {
    await modeler.value.importXML(pizzaDiagram)
    modeler.value.get("canvas").zoom("fit-viewport")
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  modeler.value = new BpmnViewer({ container: "#canvas" })
  openDiagram()
})
</script>

<style lang="less" scoped>
#canvas {
  width: 100%;
  height: calc(100vh - 100px);
}
</style>
