interface VNode {
  tagName: string
  options: Options
}

interface Options {
  attrs?: {
    [k: string]: string
  },
  innerHTML?: string
  children?: VElement[]
}

interface VElement extends Options {
  tagName: string
}

const createElement = (tagName: string, options: Options): VElement => {
  return {tagName, attrs: options.attrs, children: options.children}
}
const vApp = createElement('div', {
  attrs: {
    id: 'app',
    name: 'heellll'
  },
  innerHTML: 'hi div',
  children: [
    createElement('img', {attrs: {src: 'https://media.giphy.com/media/HhPade8aPmh0u5VKbJ/giphy.gif'}}),
    {
      tagName: 'div',
      attrs: {
        id: 'children',
        name: 'child'
      },
      innerHTML: 'hi div',
    }
  ]
})
const render = (vNode: VElement): HTMLElement => {
  console.log(vNode)
  // if (typeof vNode === 'string') {
  //   return document.createTextNode(vNode)
  // } else {
  const $el = document.createElement(vNode.tagName)
  for (const [k, v] of Object.entries(vNode)) {
    if (k === 'attrs' && !!v) {
      Object.keys(v).map(key => $el.setAttribute(key, v[key]))
    }
    if (k === 'children' && !!v) {
      v.map(child => $el.appendChild(render(child)))
    }
    if (k === 'innerHTML' && !!v) {
      $el.innerHTML = v
    }
  }
  return $el
  // }
}
const $app = render(vApp)
const mount = (node: HTMLElement, target: HTMLElement) => {
  target.replaceWith(node)
  return node
  // target.appendChild(node)
}
mount($app, document.getElementById('app'))
console.log($app)
