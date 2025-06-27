<template>
  <figure>
    <div
      ref="viewerRef"
      class="canvas"
    ></div>
    <figcaption>BPMN Modeler</figcaption>
  </figure>
</template>

<!-- 
bpmn-js构建在两个重要库之上：diagram-js和bpmn-moddle。

1、diagram-js :(Modeling)
连接地址： https://github.com/bpmn-io/bpmn-js-examples/blob/main/modeling-api/src/snippets/connectingShapes.js
更新地址： https://github.com/bpmn-io/bpmn-js-examples/blob/main/modeling-api/src/snippets/editingElements.js

绘制形状和连接,它为我们提供了与这些图形元素交互的方法
提供可扩展的基础设施模块模式、插件系统、事件总线、命令堆栈和服务查找功能
处理用户交互:移动、连接、悬停、选择、添加、删除
对于建模等高级用例，它提供了上下文垫、调色板和重做/撤消等功能。

2、bpmn-js:
构建图表验证了解BPMN，用户操作，将建模操作映射到BPMN2.0提供特定于BPMN的操作
bpmn-js定义了bpmn的细节，如外观、建模规则和工具（即调色板）

3、bpmn-moddle:
读取/写入BPMN 2.0模式的XML文档，并访问图上绘制的形状和连接背后的BPMN相关信息
-->
<!-- 
1、Canvas-提供用于添加和删除图形元素的API；处理元素生命周期，并提供缩放和滚动的API。
  const canvas = modeler.value.get("canvas")
  设置图形元素（给 id 为 _6-450 的图形添加一个 class 名字 highlight）：canvas.addMarker("_6-450", "highlight")
  缩放: canvas.zoom("fit-viewport")

2、elementFactory-一个根据diagram js的内部数据模型创建形状和连接的工厂。
源码地址： https://github.com/bpmn-io/bpmn-js-examples/blob/main/modeling-api/src/snippets/creatingShapes.js

3、ElementRegistry-知道添加到图中的所有元素，并提供API以按id检索元素及其图形表示。
  const elementRegistry = modeler.value.get("elementRegistry")
  获取 id 为 _6-695 的图形
  var shape = elementRegistry.get("_6-695")

GraphicsFactory-负责创建形状和连接的图形表示。实际的外观和感觉由渲染器定义，即绘制模块内的DefaultRenderer。
-->

<script setup lang="ts">
import Modeler from "bpmn-js/lib/Modeler"
import "bpmn-js/dist/assets/bpmn-js.css"
// import secondDiagram from "@/assets/about/overview.bpmn?raw"
import pizzaCollaboration from "@/assets/pizza-collaboration.bpmn?raw"

import "bpmn-js/dist/assets/diagram-js.css"
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css"
import Clipboard from "diagram-js/lib/features/clipboard/Clipboard"
import { onMounted, ref } from "vue"

const sharedClipboard = {
  clipboard: ["value", new Clipboard()],
}

const viewerRef = ref()
const modeler = ref()

const openDiagram = async () => {
  try {
    await modeler.value.importXML(pizzaCollaboration)

    const canvas = modeler.value.get("canvas")
    canvas.zoom("fit-viewport")

    const elementRegistry = modeler.value.get("elementRegistry")
    const overlays = modeler.value.get("overlays")
    const modeling = modeler.value.get("modeling")
    // console.log(modeler.value.get("definitions"))
    // console.log("modeler", modeler.value)
    // console.log(modeler.value.get("moddle"))
    // console.log(modeler.value.get("overlays"))
    // console.log(modeler.value.get("canvas"))
    // console.log(modeler.value.get("elementRegistry"))
    // console.log(modeler.value.get("elementFactory"))
    // console.log(modeler.value.get("modeling"))
    var shape = elementRegistry.get("_6-695")
    // console.log(shape)

    var overlayHtml = `<div class="highlight-overlay" style="width:${shape.width}px;height:${shape.height}px"></div>`
    overlays.add("_6-695", {
      position: {
        top: 0,
        left: 0,
      },
      html: overlayHtml,
    })

    var elementToColor = elementRegistry.get("_6-74")
    // 设置元素颜色
    modeling.setColor([elementToColor], {
      stroke: "green",
      fill: "rgb(152, 203, 152)",
    })

    canvas.addMarker("_6-450", "highlight")
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  modeler.value = new Modeler({
    container: viewerRef.value,
    additionalModules: [sharedClipboard],
    moddleExtensions: {},
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
  height: 400px;
  width: 100%;
  border-radius: 5px;
  border: solid 3px #eee;
}
:deep(.highlight) {
  &:not(.djs-connection) .djs-visual > :nth-child(1) {
    fill: green !important; /* color elements as green */
  }
}

:deep(.highlight-overlay) {
  background-color: green; /* color elements as green */
  opacity: 0.4;
  pointer-events: none; /* no pointer events, allows clicking through onto the element */
  border-radius: 10px;
}
</style>
