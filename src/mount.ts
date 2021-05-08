export const mount = (node: HTMLElement|Text, target: HTMLElement) => {
  target.replaceWith(node)
  return node
}
