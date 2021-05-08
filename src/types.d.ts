interface Options {
  attrs?: Attrs,
  innerHTML?: string
  children?:ChildrenType[]
}

interface VElement extends Options {
  tagName: string
}

type NodeType = HTMLElement | Text

type DiffFuc = (node:NodeType)=> void

type Attrs =  {[k: string]: string}

type ChildrenType = VElement| string
