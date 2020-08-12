import G6 from "@antv/g6";
import MiniMap from "@antv/g6/es/plugins/minimap";
import Grid from "@antv/g6/es/plugins/grid";
import "./node/rect-node";
import "./behavior/node-link";
import "./behavior/node-hover";

const data = {
  graph: null,
  graphData: {
    nodes: [
      {
        id: "rect0",
        type: "rect-node",
        label: "This label is too long to be displayed",
        x: 100,
        y: 100,
      },
    ],
    edges: [],
  },
  i: 1,
  modes: {
    default: [
      "drag-canvas",
      "zoom-canvas",
      "drag-node",
      "node-hover"
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

function onEventListener () {
  const graph = data.graph;
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
}

export const initGraph = function (ele) {
  const minimap = new MiniMap({
    size: [150, 150],
    className: "minimap",
    type: "delegate",
  });
  const grid = new Grid();
  const initOptions = Object.assign(
    {
      container: ele,
      width: 1800,
      height: 800,
      renderer: "svg",
      // layout: {
      // preventOverlap: true, // 防止节点重叠
      // linkDistance: 100, // 指定边距离为100
      // nodeSize: 30        // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
      // },
      modes: data.modes,
      // fitView: true,
      // fitViewPadding: [20, 40, 50, 20],
      plugins: [minimap, grid],
    },
    data.stateStyle,
    data.defaultStyle
  );
  data.graph = new G6.Graph(
    initOptions
  );
  data.graph.data(data.graphData);
  data.graph.render();
  onEventListener();
  return data.graph;
};