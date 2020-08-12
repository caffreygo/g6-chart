<template>
  <div class="container">
    <div class="header">
      <el-button @click="handleAddCircle">Circle</el-button>
      <el-button @click="handleAddRect">Rect</el-button>
    </div>
    <div class="main">
      <div id="graph-container"></div>
    </div>
  </div>
</template>
<script>
import { initGraph } from "./G6";

export default {
  name: "GraphView",
  data () {
    return {
      graph: null,
      i: 0
    };
  },
  mounted () {
    this.graph = initGraph("graph-container");
  },
  methods: {
    async getData () {
      const response = await fetch(
        "https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json"
      );
      this.graphData = await response.json();
      this.initNodeStyle(this.graphData.nodes);
      this.initEdgeStyle(this.graphData.edges);
    },
    handleAddCircle () {
      const model = {
        id: "circle" + (++this.i),
        label: "圆",
        type: "circle",
        x: 200 + this.i * 15,
        y: 150 + this.i * 15,
        style: {
          fill: "#fff",
        },
      };

      this.graph.addItem("node", model);
    },
    handleAddRect () {
      const model = {
        id: "rect" + (++this.i),
        label: "方块",
        type: "rect-node",
        x: 200 + this.i * 15,
        y: 150 + this.i * 15,
      };

      this.graph.addItem("node", model);
    },
    initNodeStyle (nodes) {
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
    initEdgeStyle (edges) {
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
.container,
.main {
  position: relative;
}
.minimap {
  position: absolute;
  border: 2px solid #ccc;
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