
// 根据fiber节点创建真实的dom节点
function createDom(fiber) {
  const dom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode("") : document.createElement(fiber.type)

  const isProperty = key => key !== 'children'
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = fiber.props[name]
    })

  return dom
}

let nextUnitOfWork = null
let wipRoot = null
// render函数主要逻辑：
//   根据root container容器创建root fiber
//   将nextUnitOfWork指针指向root fiber
//   element是react element tree
function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element], // 此时的element还只是React.createElement函数创建的virtual dom树
    },
  }
  nextUnitOfWork = wipRoot
}

function commitRoot() {
  commitWork(wipRoot.child)
  wipRoot = null
}

function commitWork(fiber) {
  if (!fiber) {
    return
  }
  const domParent = fiber.parent.dom;
  domParent.appendChild(fiber.dom)
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }
  requestIdleCallback(workLoop)
}



// performUnitOfWork函数主要逻辑：
//   将element元素添加到DOM
//   给element的子元素创建对应的fiber节点
//   返回下一个工作单元，即下一个fiber节点，查找过程：
//      1.如果有子元素，则返回子元素的fiber节点
//      2.如果没有子元素，则返回兄弟元素的fiber节点
//      3.如果既没有子元素又没有兄弟元素，则往上查找其父节点的兄弟元素的fiber节点
//      4.如果往上查找到root fiber节点，说明render过程已经结束
function performUnitOfWork(fiber) {
  // 第一步 根据fiber节点创建真实的dom节点，并保存在fiber.dom属性中
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  // // 第二步 将当前fiber节点的真实dom添加到父节点中，注意，这一步是会触发浏览器回流重绘的！！！
  // if (fiber.parent) {
  //   fiber.parent.dom.appendChild(fiber.dom)
  // }
  // 第三步 给子元素创建对应的fiber节点
  const children = fiber.props.children
  let prevSibling
  children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      parent: fiber,
      dom: null
    }
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
  })

  // 第四步，查找下一个工作单元
  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
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