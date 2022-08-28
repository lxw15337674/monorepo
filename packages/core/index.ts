function Parent(name) {
  this.name = [name]
}
Parent.prototype.getName = function () {
  return 'get parent name'
}
function Child() {
  // 构造函数继承
  Parent.call(this, 'bhwa233')
}
//原型链继承
// Child.prototype = new Parent()
Child.prototype = { ...Parent.prototype }  //将`指向父类实例`改为`指向父类原型`
Child.prototype.constructor = Child

//测试
const child = new Child()
child.getName = function () {
  return 'get child name'
}
const parent = new Parent()
console.log(child.getName())   // get child name
console.log(parent.getName()) //  get parent name
