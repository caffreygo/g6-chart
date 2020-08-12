import G6 from "@antv/g6";
import { fittingString } from "../utils";

const globalFontSize = 14;

G6.registerNode(
  'rect-node',
  {
    options: {
      size: [150, 80],
      rectStyle: {
        fill: "#ffffff",
        stroke: '#333333',
        lineWidth: 2,
      },
      anchorStyle: {
        r: 3,
        fill: '#FFFFFF',
        stroke: '#333333',
        lineWidth: 1,
        class: 'rect-node-anchor'
      },
      stateStyles: {
        hover: {
          fill: '#333333'
        }
      }
    },
    draw (cfg, group) {
      const size = Array.isArray(cfg.size) ? cfg.size : this.options.size;
      const shape = group.addShape("rect", {
        name: 'rect-shape',
        attrs: Object.assign({
          x: 0,
          y: 0,
          width: size[0],
          height: size[1],
        }, this.options.rectStyle)
      });
      // 文本节点
      if (cfg.label) {
        group.addShape("text", {
          attrs: {
            text: fittingString(cfg.label, size[0] - 10, globalFontSize),
            x: size[0] / 2, // 居中
            y: size[1] / 2,
            textAlign: "center",
            fontSize: globalFontSize,
            textBaseline: "middle",
            fill: "#323232",
            class: "rect-node-label"
          },
          name: 'text-shape'
        });
      }
      // 锚点节点
      const anchorArr = [[size[0] / 2, 0], [size[0], size[1] / 2], [size[0] / 2, size[1]], [0, size[1] / 2]];
      let anchorGroup = group.addGroup();
      anchorArr.forEach(anchor => {
        anchorGroup.addShape("circle", {
          attrs: Object.assign(this.options.anchorStyle, {
            x: anchor[0],
            y: anchor[1],
          }),
          name: 'rect-anchor'
        });
      });
      return shape;
    },
    /**
     * 绘制后的附加操作，默认没有任何操作
     * @param  {Object} cfg 节点的配置项
     * @param  {G.Group} group 图形分组，节点中的图形对象的容器
     */
    afterDraw (cfg, group) { },
    /**
     * 更新节点，包含文本
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Node} node 节点
     */
    update (cfg, node) { },
    /**
     * 更新节点后的操作，一般同 afterDraw 配合使用
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Node} node 节点
     */
    afterUpdate (cfg, node) { },
    /**
     * 设置节点的状态，主要是交互状态，业务状态请在 draw 方法中实现
     * 单图形的节点仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
     * @param  {String} name 状态名称
     * @param  {Object} value 状态值
     * @param  {Node} node 节点
     */
    setState (name, value, node) { },
    /**
     * 获取锚点（相关边的连入点）
     * @param  {Object} cfg 节点的配置项
     * @return {Array|null} 锚点（相关边的连入点）的数组,如果为 null，则没有锚点
     */
    getAnchorPoints (cfg) { },
  },
  'extendedNodeName',
);