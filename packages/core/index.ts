const DEFAULT_RUNTIME = 16;
let sum = 0;
const runner = (tasks) => {
  const prevTime = performance.now();
  do {
    if (tasks.length === 0) {
      return;
    }
    const task = tasks.shift();
    const value = task();
    sum += value;
  } while (performance.now() - prevTime < DEFAULT_RUNTIME);

  setTimeout(() => runner(tasks));
};

console.time();
for (let i = 0; i < 10000; i++) {
  for (let j = 0; j < 1000000; j++) { }
}
console.timeEnd();