// 1.jsx语法不是合法的js语法
// const element = <h1 title="foo">Hello</h1>
// 2.经babel等编译工具将jsx转换成js，将jsx转换成createElement函数调用的方式
// const element = React.createElement(
//   "h1",
//   { title: "foo" },
//   "Hello"
// )
// 3.React.createElement返回的最终对象大致如下：
const element = {
  type: "h1",
  props: {
    title: "foo",
    children: "Hello",
  },
}
const container = document.getElementById("root")
// ReactDOM.render(element, container)
// 4.替换ReactDOM.render函数的逻辑，ReactDOM.render大致处理逻辑：
const node = document.createElement(element.type)
node['title'] = element.props.title
const text = document.createTextNode("")
text["nodeValue"] = element.props.children
node.appendChild(text)
container.appendChild(node)
