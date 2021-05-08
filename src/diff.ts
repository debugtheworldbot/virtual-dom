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

const diffAttrs = (oldAttrs: Attrs, newAttrs: Attrs): DiffFuc => {
  return (node) => {

    return node
  }
}
const diffChildren = (oldAttrs: VElement[], newAttrs: VElement[]): DiffFuc => {
  return (node) => {

    return node
  }
}