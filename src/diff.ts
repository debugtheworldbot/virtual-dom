import {render} from './render'
import {mount} from './mount'

export const diff = (oldVTree: ChildrenType, newVTree?: ChildrenType): DiffFuc => {
  if (!newVTree) {
    return (node) => {
      node.remove()
    }
  }
  if (typeof oldVTree === 'string' || typeof newVTree === 'string') {
    if (oldVTree !== newVTree) {
      return (node) => {
        mount(render(newVTree), node)
      }
    }
  } else if (oldVTree.tagName !== newVTree.tagName) {
    return (node: NodeType) => {
      mount(render(newVTree), node)
    }
  }
  const patchAttrs = diffAttrs((oldVTree as VElement).attrs, (newVTree as VElement).attrs)
  const patchChildren = diffChildren((oldVTree as VElement).children as VElement[], (newVTree as VElement).children as VElement[])

  return (node: NodeType) => {
    patchAttrs(node)
    patchChildren(node)
  }
}

const diffAttrs = (oldAttrs: Attrs = {}, newAttrs: Attrs = {}): DiffFuc => {
  const patches = []
  // add attrs
  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push((node: HTMLElement) => {
      node.setAttribute(k, v)
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
  }
}

const zip = (l: DiffFuc[], r: NodeListOf<ChildNode>) => {
  const result = []
  for (let i = 0; i < Math.min(l.length, r.length); i++) {
    result.push([l[i], r[i]])
  }
  return result
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
    if (patches.length > 0) {
      for (const [patch, child] of zip(patches, parent.childNodes)) {
        patch(child)
      }
    }
    for (const patch of additionalPatches) {
      patch(parent)
    }
    return parent
  }
}