import { Button } from 'antd';
import Countdown from 'antd/lib/statistic/Countdown';
import { reject } from 'lodash';
import React from 'react';
const PlainTextExample = () => {
  const schduler = (tasks) => {
    const DEFAULT_RUNTIME = 16;
    let sum = 0;
    let isAbort = false
    const { port1, port2 } = new MessageChannel();

    const promise = new Promise((resolve, reject) => {
      console.time();
      const runner = () => {
        const prevTime = performance.now();
        do {
          if (isAbort) {
            return reject()
          }
          if (tasks.length === 0) {
            console.log(sum);
            return resolve(sum)
          }
          const task = tasks.shift();
          const value = task();
          console.log(sum, value);
          sum += value;
        } while (performance.now() - prevTime < DEFAULT_RUNTIME);
        port2.postMessage('')
      };
      port1.onmessage = function () {
        runner();
      };
      port2.postMessage('');
      console.timeEnd();
    })
    promise.abort = () => {
      isAbort = true
    }
    return promise
  }


  const reload = () => {
    console.time();
    for (let i = 0; i < 10000; i++) {
      for (let j = 0; j < 1000000; j++) { }
    }
    console.timeEnd();
  }

  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; 
  return (
    <div>
      <Button onClick={() => {
        reload()
      }}>
        reload
      </Button>
      <Button onClick={() => {
        const tasks = [];
        for (let i = 0; i < 10000; i++) {
          tasks.push(() => {
            for (let j = 0; j < 1000000; j++) {
            }
            return i
          });
        }
        schduler(tasks).then(sum => console.log(sum));
      }}>
        schduler
      </Button>
      <Countdown title="Million Seconds" value={deadline} format="HH:mm:ss:SSS" />
    </div>
  );
};

export default PlainTextExample;
