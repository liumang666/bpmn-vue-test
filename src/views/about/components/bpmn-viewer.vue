<template>
  <figure>
    <div
      ref="viewerRef"
      class="canvas"
    ></div>
    <figcaption>BPMN Viewer</figcaption>
  </figure>
</template>

<script setup lang="ts">
import BpmnViewer from "bpmn-js/lib/Viewer"
import { onMounted, ref } from "vue"
import "bpmn-js/dist/assets/bpmn-js.css"
import secondDiagram from "@/assets/about/first.bpmn?raw"

const viewerRef = ref()
const modeler = ref()

const openDiagram = async () => {
  try {
    await modeler.value.importXML(secondDiagram)
    modeler.value.get("canvas").zoom("fit-viewport")
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  modeler.value = new BpmnViewer({
    container: viewerRef.value,
    additionalModules: [],
  })
  openDiagram()
})
</script>

<style scoped lang="less">
figure {
  margin: 30px 0;
  :deep(svg) {
    &:focus {
      outline-color: cornflowerblue;
    }
  }
}
figcaption {
  margin-top: 0.85em;
  text-align: center;
}
.canvas {
  height: 300px;
  width: 100%;
  border-radius: 5px;
  border: solid 3px #eee;
}
</style>
