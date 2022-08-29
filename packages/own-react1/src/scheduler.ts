let nextUnitOfWork = null
function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

// performUnitOfWork接收当前工作单元，并返回下一个工作单元。工作单元可以理解为就是一个fiber对象节点
function performUnitOfWork(nextUnitOfWork) {
  // TODO
}