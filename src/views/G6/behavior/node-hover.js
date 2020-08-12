import G6 from "@antv/g6";
import GraphComponent from "../../Home.vue";

G6.registerBehavior("node-hover", {
  // 设定该自定义行为需要监听的事件及其响应函数
  getEvents () {
    return {
      "node:mouseenter": "onMouseenter",
      "node:mouseleave": "onMouseleave",
      "edge:mouseenter": "onMouseenter",
      "edge:mouseleave": "onMouseleave"
    };
  },
  onMouseenter (ev) {
    let { item } = ev;
    this.item = item;
    console.log(GraphComponent);
    // graph.setItemState(item, "hover", true);
  },
  onMouseleave (ev) {
    // graph.clearItemStates(this.item, "hover");
  }
});
