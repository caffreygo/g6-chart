<template>
  <div class="about">
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
      width: 800,
      height: 500,
      plugins: [grid],
    });
    // 读取数据
    this.graph.data(this.data);
    // 渲染图
    this.graph.render();
  },
};
</script>
