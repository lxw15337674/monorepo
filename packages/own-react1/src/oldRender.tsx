function render(element, container) {
  const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode("") : document.createElement(element.type)

  const isProperty = key => key !== 'children'
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })
  element.props?.children?.forEach(child => {
    render(child, dom)
  });
  container.appendChild(dom)
}

const MiniReact = {
  createElement: (type, props, ...children) => {
    return {
      type,
      props: {
        ...props,
        children: children.map(child => {
          if (typeof child === 'object') {
            return child
          }
          return {
            type: 'TEXT_ELEMENT',
            props: {
              nodeValue: child,
              children: [],
            }
          }
        })
      }
    }
  }
}
const element = MiniReact.createElement(
  "div",
  { id: "foo" },
  MiniReact.createElement("a", null, "bar"),
  MiniReact.createElement('div', null, 'div')
)
console.log('element======', element)
const container = document.getElementById("root")
render(element, container)