import {render} from './render'
import {mount} from './mount'

export const diff = (oldVTree: VElement, newVTree?: VElement): DiffFuc => {
  if (!newVTree) {
    return (node) => {
      node.remove()
      return undefined
    }
  }
  if (typeof oldVTree === 'string' || typeof newVTree === 'string') {
    if (oldVTree !== newVTree) {
      return (node) => {
        const newNode = render(newVTree)
        mount(newNode, node)
        return newNode
      }
    } else {
      return (node => node)
    }
  } else {
    if (oldVTree.tagName !== newVTree.tagName || oldVTree.innerHTML !== newVTree.innerHTML) {
      return (node: NodeType) => {
        const newNode = render(newVTree)
        mount(newNode, node)
        return newNode
      }
    }
  }
  const patchAttrs = diffAttrs(oldVTree.attrs, newVTree.attrs)
  const patchChildren = diffChildren(oldVTree.children, newVTree.children)

  return (node: NodeType) => {
    patchAttrs(node)
    patchChildren(node)
    return node
  }
}

const diffAttrs = (oldAttrs: Attrs ={}, newAttrs: Attrs={}): DiffFuc => {
  const patches = []
  // add attrs
  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push((node: HTMLElement) => {
      node.setAttribute(k, v)
      return node
    })
  }
  // remove old attrs
  for (const [k] of Object.entries(oldAttrs)) {
    if (!(k in newAttrs)) {
      patches.push((node: HTMLElement) => {
        node.removeAttribute(k)
      })
    }
  }
  return (node) => {
    for (const patch of patches) {
      patch(node)
    }
    return node
  }
}
const diffChildren = (oldChildren: VElement[] = [], newChildren: VElement[] = []): DiffFuc => {
  const patches = []
  oldChildren.forEach((oldChild, i) => {
    patches.push(diff(oldChild, newChildren[i]))
  })

  const additionalPatches = []
  for (const additionalChild of newChildren.slice(oldChildren.length)) {
    additionalPatches.push((node: HTMLElement) => {
      node.appendChild(render(additionalChild))
    })
  }
  return (parent) => {
    patches.length>0 && parent.childNodes.forEach((child,i)=>{
      patches[i](child)
    })
    for (const patch of additionalPatches) {
      patch(parent)
    }

    return parent
  }
}