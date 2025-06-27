<template>
  <Space>
    <Button
      @click="handleView"
      type="primary"
      >预览</Button
    >
    <Button
      @click="handleSvg"
      type="primary"
      >下载svg</Button
    >
    <Button
      @click="handleDownloadXml"
      type="primary"
      >下载xml</Button
    >
    <Upload
      action=""
      @before-upload="beforeUpload"
    >
      <template #upload-button>
        <Button type="outline"> 上传xml </Button>
      </template>
    </Upload>
  </Space>
  <figure>
    <div class="contain">
      <div
        ref="viewerRef"
        class="canvas"
      ></div>
      <div
        id="js-properties-panel"
        class="panel"
      ></div>
    </div>
    <figcaption>BPMN Modeler</figcaption>
  </figure>

  <Drawer
    title="预览"
    v-model:visible="visible"
    width="55%"
    unmount-on-close
    :footer="false"
    class="drawer"
  >
    <div style="color: #61aeee; padding: 20px">
      <pre>{{ xmlData }}</pre>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import { Drawer, Space, Button, Upload } from "@arco-design/web-vue"
import { onMounted, ref } from "vue"

import Modeler from "bpmn-js/lib/Modeler"
import secondDiagram from "@/assets/about/overview.bpmn?raw"
// import pizzaCollaboration from "@/assets/pizza-collaboration.bpmn?raw"
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from "bpmn-js-properties-panel"

import "bpmn-js/dist/assets/diagram-js.css"
import "bpmn-js/dist/assets/bpmn-js.css"
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css"

import "@bpmn-io/properties-panel/assets/properties-panel.css"

// import Clipboard from "diagram-js/lib/features/clipboard/Clipboard"
// import flowableJson from "./flowable.json?url"
// import customTranslate from "./customTranslate"

import vkBeautify from "vkbeautify"

// const sharedClipboard = {
//   clipboard: ["value", new Clipboard()],
// }

const xmlData = ref("")
const visible = ref(false)
const viewerRef = ref()
const modeler = ref()

const openDiagram = async (xml?: string) => {
  try {
    await modeler.value.importXML(xml || secondDiagram)
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  modeler.value = new Modeler({
    container: viewerRef.value,
    propertiesPanel: {
      parent: "#js-properties-panel",
    },
    additionalModules: [
      BpmnPropertiesPanelModule,
      BpmnPropertiesProviderModule,
      /** 翻译文字 */
      // {
      //   translate: ["value", customTranslate],
      // },
    ],
    /** extensions flowable */
    // moddleExtensions: {
    //   flowable: flowableJson,
    // },
  })
  openDiagram()
})

const getProcessElement = () => {
  const rootElements = modeler.value.getDefinitions().rootElements
  for (let i = 0; i < rootElements.length; i++) {
    if (rootElements[i].$type === "bpmn:Process") return rootElements[i]
  }
}

const downloadFile = async (filename: any, data: any, type: any) => {
  const a = document.createElement("a")
  const url = window.URL.createObjectURL(new Blob([data], { type: type }))
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}

const saveXML = async () => {
  try {
    const { xml } = await modeler.value.saveXML({ format: true })
    return xml
  } catch (err) {
    console.log(err)
  }
}

const handleView = async () => {
  visible.value = true
  const xml = await saveXML()
  xmlData.value = vkBeautify.xml(xml)
}
const handleDownloadXml = async () => {
  const { xml } = await saveXML()
  downloadFile(
    `${getProcessElement().name || "flow"}.bpmn20.xml`,
    xml,
    "application/xml"
  )
}
const handleSvg = async () => {
  const { svg } = await modeler.value.saveSVG({ format: true })
  downloadFile(getProcessElement().name || "flow", svg, "image/svg+xml")
}
const beforeUpload = async (file: any) => {
  const reader = new FileReader()
  reader.readAsText(file, "utf-8")
  reader.onload = () => {
    reader.result && openDiagram(reader.result as string)
  }
  return false
}
</script>

<style scoped lang="less">
.contain {
  height: calc(100vh - 120px);
  margin: 30px 0;
  box-sizing: border-box;
  display: flex;
  .canvas {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
    border-radius: 5px;
    border: solid 3px #eee;
  }
  .panel {
    flex: 0 0 400px;
  }
}
figure {
  margin: 0;
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
</style>
<style lang="less">
.drawer {
  .arco-drawer-body {
    background-color: #1c1717;
  }
}
</style>
