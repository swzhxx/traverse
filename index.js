const isFunction = arg => {
 return typeof arg === 'function'
}

const traverse = (
 nodes,
 callback = {},
 childrenKey = 'children',
 path = []
) => {
 //周期 {enter,leave}
 let cycle = {}
 if (isFunction(callback)) {
  cycle.enter = callback
 } else {
  cycle.enter = callback.enter
  cycle.leave = callback.leave
 }

 nodes.forEach((node, index) => {
  cycle.enter && cycle.enter(node, [...path], index)
  if (node[childrenKey] && node[childrenKey].length) {
   traverse(node[childrenKey], callback, childrenKey, [...path, node])
  }

  cycle.leave && cycle.leave(node, [...path], childrenKey, index)
 })
}

module.exports = traverse
