interface Options {
  attrs?: Attrs,
  innerHTML?: string
  children?: VElement[]
}

interface VElement extends Options {
  tagName: string
}

type NodeType = HTMLElement | Text

type DiffFuc = (node:NodeType)=> void

type Attrs =  {[k: string]: string}
