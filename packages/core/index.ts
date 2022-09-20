import "reflect-metadata";

const validator = (target: Object, propertyKey: string, index: number) => {

}
class C {
  add(@validator x: number, y: number) {
    return x + y;
  }
}

const c = new C();
c.add(1, 2);
// -> params: 1, 2
// -> result: 3