interface VNode {
  tagName: string
  attrs: {
    [k:string]: string
  },
  children: VNode[]
}

const createElement = (tagName: string, {attrs, children}): VNode => {
  return {tagName, attrs, children}
}
const vApp = createElement('div', {
  attrs: {
    id: 'app',
  },
  children: [
    'hello'
  ]
})
const render = (vNode:VNode) => {
  const $el = document.createElement(vNode.tagName)
  for (const [k,v] of Object.entries(vNode)){
    console.log(k)
  }

  return $el
}
const $app = render(vApp)
console.log($app)
