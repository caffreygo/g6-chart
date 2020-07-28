<template>
  <div class="about">
    <el-button @click="handleAddCircle">add Circle</el-button>
    <el-button @click="handleAddRect">add Rect</el-button>
    <div id="mountNode"></div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
import Grid from "@antv/g6/es/plugins/grid";
export default {
  data() {
    return {
      graph: null,
      i: 0,
      data: {
        // 点集
        nodes: [
          {
            id: "node1",
            x: 100,
            y: 200,
          },
          {
            id: "node2",
            x: 300,
            y: 200,
          },
        ],
        // 边集
        edges: [
          // 表示一条从 node1 节点连接到 node2 节点的边
          {
            source: "node1",
            target: "node2",
          },
        ],
      },
    };
  },
  mounted() {
    const grid = new Grid();
    this.graph = new G6.Graph({
      container: "mountNode", // 指定图画布的容器 id，与第 9 行的容器对应
      // 画布宽高
      width: 1920,
      height: 600,
      modes: {
        default: ["drag-canvas"],
      },
      plugins: [grid],
    });
    // 读取数据
    this.graph.data(this.data);
    // 渲染图
    console.log(123);
    this.graph.render();
  },
  methods: {
    handleAddCircle() {
      const model = {
        id: "circle" + this.i++,
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
    handleAddRect() {
      const model = {
        id: "rect" + this.i++,
        label: "方块",
        type: "rect",
        x: 200 + this.i * 25,
        y: 150 + this.i * 25,
        style: {
          fill: "#fff",
        },
      };

      this.graph.addItem("node", model);
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
  },
};
</script>
