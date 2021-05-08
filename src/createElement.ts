export const createElement = (tagName: string, options: Options): VElement => {
  const vElem = Object.create(null) // pure object , no prototype
  Object.assign(vElem, {tagName, attrs: options.attrs, children: options.children, innerHTML: options.innerHTML})
  return vElem
}