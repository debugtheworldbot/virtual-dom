export const mount = (node: HTMLElement|Text, target: HTMLElement|Text) => {
  target.replaceWith(node)
  return node
}
