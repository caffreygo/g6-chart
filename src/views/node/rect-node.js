import G6 from "@antv/g6";

G6.registerNode(
  'rect-node',
  {
    options: {
      size: [150, 80],
    },
    draw(cfg, group) {
      const size = Array.isArray(cfg.size) ? cfg.size : this.options.size
      const shape = group.addShape("rect", {
        name: 'rect-shape',
        attrs: {
          x: 0,
          y: 0,
          width: size[0],
          height: size[1],
          fill: "#ffffff",
          stroke: '#323232',
          lineWidth: 3,
        },

      })
      // if (cfg.label) {
      //   group.addShape("text", {
      //     // attrs: style
      //     attrs: {
      //       text: cfg.label,
      //       x: 150 / 2, // 居中
      //       y: 0 - 20,
      //       textAlign: "center",
      //       textBaseline: "middle",
      //       fill: "#e4e4e4",
      //       class: "rect-node-label"
      //     }
      //   });
      // }
      return shape
    },
    /**
     * 绘制后的附加操作，默认没有任何操作
     * @param  {Object} cfg 节点的配置项
     * @param  {G.Group} group 图形分组，节点中的图形对象的容器
     */
    afterDraw(cfg, group) { },
    /**
     * 更新节点，包含文本
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Node} node 节点
     */
    update(cfg, node) { },
    /**
     * 更新节点后的操作，一般同 afterDraw 配合使用
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Node} node 节点
     */
    afterUpdate(cfg, node) { },
    /**
     * 设置节点的状态，主要是交互状态，业务状态请在 draw 方法中实现
     * 单图形的节点仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
     * @param  {String} name 状态名称
     * @param  {Object} value 状态值
     * @param  {Node} node 节点
     */
    setState(name, value, node) { },
    /**
     * 获取锚点（相关边的连入点）
     * @param  {Object} cfg 节点的配置项
     * @return {Array|null} 锚点（相关边的连入点）的数组,如果为 null，则没有锚点
     */
    getAnchorPoints(cfg) { },
  },
  'extendedNodeName',
);