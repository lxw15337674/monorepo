function f(key: string): any {
  console.log("evaluate: ", key);
  return function () {
    console.log("call: ", key);
  };
}

@f("Class Decorator")
class C {
  @f("Static Property")
  static prop?: number;

  @f("Static Method")
  static method(@f("Static Method Parameter") foo) { }

  constructor(@f("Constructor Parameter") foo) { }

  @f("Instance Method")
  method(@f("Instance Method Parameter") foo) { }

  @f("Instance Property")
  prop?: number;
}