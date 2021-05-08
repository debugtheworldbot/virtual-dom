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