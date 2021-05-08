interface Options {
  attrs?: Attrs,
  innerHTML?: string
  children?: VElement[]
}

interface VElement extends Options {
  tagName: string
}

type NodeType = HTMLElement | Text

type DiffFuc = (node:NodeType)=>NodeType | undefined

type Attrs =  {[k: string]: string}
