interface VNode {
  tagName: string
  options: Options
}

interface Options {
  attrs?: {
    [k: string]: string
  },
  innerHTML?: string
  children?: (VElement|string)[]
}

interface VElement extends Options {
  tagName: string
}

const createElement = (tagName: string, options: Options): VElement => {
  return {tagName, attrs: options.attrs, children: options.children, innerHTML: options.innerHTML}
}
const vApp = createElement('div', {
  attrs: {
    id: 'app',
    name: 'heellll',
  },
  innerHTML: 'hi div',
  children: [
    createElement('img', {attrs: {src: 'https://media.giphy.com/media/HhPade8aPmh0u5VKbJ/giphy.gif'}}),
    'just string',
    createElement('div', {attrs: {name: 'another div'}, innerHTML: 'another div'})
  ]
})
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
const render = (vNode: VElement|string): HTMLElement|Text => {
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode)
  }
  return _render(vNode)
}
const $app = render(vApp)
const mount = (node: HTMLElement|Text, target: HTMLElement) => {
  target.replaceWith(node)
  return node
}
mount($app, document.getElementById('app'))
console.log($app)
