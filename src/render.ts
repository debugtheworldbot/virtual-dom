const _render = (vNode: VElement): HTMLElement => {
  const $el = document.createElement(vNode.tagName)
  const {attrs = {}, children = [], innerHTML} = vNode
  if (innerHTML) {
    $el.innerHTML = innerHTML
  }
  for (const [k, v] of Object.entries(attrs)) {
    $el.setAttribute(k, v)
  }
  for (const child of children) {
    $el.appendChild(render(child))
  }
  return $el
}
export const render = (vNode: VElement|string): HTMLElement|Text => {
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode)
  }
  return _render(vNode)
}