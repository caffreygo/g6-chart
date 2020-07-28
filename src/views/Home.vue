<template>
  <div class="container">
    <div id="mountNode"></div>
  </div>
</template>
<script>
import G6 from "@antv/g6";
import MiniMap from "@antv/g6/es/plugins/minimap";
import Grid from "@antv/g6/es/plugins/grid";

export default {
  name: "GraphView",
  data() {
    return {
      graph: null,
      graphData: null,
      modes: {
        default: [
          "drag-canvas",
          "zoom-canvas",
          "drag-node", // 允许拖拽画布、放缩画布、拖拽节点
          {
            type: "tooltip", // 提示框
            formatText(model) {
              // 提示框文本内容
              const text =
                "label: " + model.label + "<br/> class: " + model.class;
              return text;
            },
          },
          {
            type: "edge-tooltip", // 边提示框
            formatText(model) {
              // 边提示框文本内容
              const text =
                "source: " +
                model.source +
                "<br/> target: " +
                model.target +
                "<br/> weight: " +
                model.weight;
              return text;
            },
          },
        ],
      },
      stateStyle: {
        nodeStateStyles: {
          // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
          hover: {
            fill: "lightsteelblue",
          },
          // 鼠标点击节点，即 click 状态为 true 时的样式
          click: {
            stroke: "#000",
            lineWidth: 3,
          },
        },
        // 节点不同状态下的样式集合
        edgeStateStyles: {
          // 鼠标点击边，即 click 状态为 true 时的样式
          click: {
            stroke: "steelblue",
          },
        },
      },
      defaultStyle: {
        defaultNode: {
          size: 50,
          style: {
            fill: "steelblue", // 节点填充色
            stroke: "#666", // 节点描边色
            lineWidth: 1, // 节点描边粗细
          },
          labelCfg: {
            // 节点上的标签文本样式配置
            style: {
              fill: "#fff", // 节点标签文字颜色
            },
          },
        },
        defaultEdge: {
          // 边上的标签文本配置
          labelCfg: {
            autoRotate: true, // 边上的标签文本根据边的方向旋转
          },
        },
      },
    };
  },
  async mounted() {
    const minimap = new MiniMap({
      size: [200, 200],
      className: "minimap",
      type: "delegate",
    });
    const grid = new Grid();
    this.graph = new G6.Graph(
      Object.assign(
        {
          container: "mountNode",
          width: 1920,
          height: 800,
          layout: {
            // Object，可选，布局的方法及其配置项，默认为 random 布局。
            type: "force", // 指定为力导向布局
            preventOverlap: true, // 防止节点重叠
            linkDistance: 100, // 指定边距离为100
            // nodeSize: 30        // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
          },
          modes: this.modes,
          // fitView: true,
          // fitViewPadding: [20, 40, 50, 20],
          plugins: [minimap, grid],
        },
        this.stateStyle,
        this.defaultStyle
      )
    );
    await this.getData();
    this.graph.data(this.graphData);
    this.graph.render();
    this.onEventListener();
  },
  methods: {
    async getData() {
      const response = await fetch(
        "https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json"
      );
      this.graphData = await response.json();
      this.initNodeStyle(this.graphData.nodes);
      this.initEdgeStyle(this.graphData.edges);
    },
    onEventListener() {
      const graph = this.graph;
      // 鼠标进入节点
      graph.on("node:mouseenter", (e) => {
        const nodeItem = e.item; // 获取鼠标进入的节点元素对象
        graph.setItemState(nodeItem, "hover", true); // 设置当前节点的 hover 状态为 true
      });

      // 鼠标离开节点
      graph.on("node:mouseleave", (e) => {
        const nodeItem = e.item; // 获取鼠标离开的节点元素对象
        graph.setItemState(nodeItem, "hover", false); // 设置当前节点的 hover 状态为 false
      });

      // 点击节点
      graph.on("node:click", (e) => {
        // 先将所有当前是 click 状态的节点置为非 click 状态
        const clickNodes = graph.findAllByState("node", "click");
        clickNodes.forEach((cn) => {
          graph.setItemState(cn, "click", false);
        });
        const nodeItem = e.item; // 获取被点击的节点元素对象
        graph.setItemState(nodeItem, "click", true); // 设置当前节点的 click 状态为 true
      });

      // 点击边
      graph.on("edge:click", (e) => {
        // 先将所有当前是 click 状态的边置为非 click 状态
        const clickEdges = graph.findAllByState("edge", "click");
        clickEdges.forEach((ce) => {
          graph.setItemState(ce, "click", false);
        });
        const edgeItem = e.item; // 获取被点击的边元素对象
        graph.setItemState(edgeItem, "click", true); // 设置当前边的 click 状态为 true
      });
    },
    initNodeStyle(nodes) {
      nodes.forEach((node) => {
        if (!node.style) {
          node.style = {};
        }
        switch (
          node.class // 根据节点数据中的 class 属性配置图形
        ) {
          case "c0": {
            node.type = "circle"; // class = 'c0' 时节点图形为 circle
            break;
          }
          case "c1": {
            node.type = "rect"; // class = 'c1' 时节点图形为 rect
            node.size = [35, 20]; // class = 'c1' 时节点大小
            break;
          }
          case "c2": {
            node.type = "ellipse"; // class = 'c1' 时节点图形为 ellipse
            node.size = [35, 20]; // class = 'c2' 时节点大小
            break;
          }
        }
      });
    },
    initEdgeStyle(edges) {
      edges.forEach((edge) => {
        if (!edge.style) {
          edge.style = {};
        }
        edge.style.lineWidth = edge.weight; // 边的粗细映射边数据中的 weight 属性数值
        edge.style.opacity = 0.6;
        edge.style.stroke = "grey";
      });
    },
  },
};
</script>

<style lang="scss">
.container {
  position: relative;
}
.minimap {
  position: absolute;
  left: 40px;
  top: 30%;
}
.g6-tooltip,
.edge-tooltip {
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-size: 12px;
  color: #545454;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 8px;
  box-shadow: rgb(174, 174, 174) 0px 0px 10px;
}
</style>