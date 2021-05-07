interface VNode {
  tagName: string
  options: Options
}

interface Options {
  attrs: {
    [k: string]: string
  },
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
  children: [
    {
      tagName: 'div',
      attrs: {
        id: 'children',
        name: 'child'
      }
    }
  ]
})
const render = (vNode: VElement) => {
  console.log(vNode)
  // if (typeof vNode === 'string') {
  //   return document.createTextNode(vNode)
  // } else {
  const $el = document.createElement(vNode.tagName)
  for (const [k, v] of Object.entries(vNode)) {
    if (k === 'attrs') {
      Object.keys(v).map(key => $el.setAttribute(key, v[key]))
    }
    if (k === 'children') {
      v.map(child => $el.appendChild(render(child)))
    }
  }
  return $el
  // }
}
const $app = render(vApp)
console.log($app)
