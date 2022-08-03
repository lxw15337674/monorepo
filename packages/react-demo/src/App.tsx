import React, { useRef } from 'react';
import initStore from './initStore';
import { Container } from './styled';
export interface IState {
  theme: string;
  color: string;
}
const initialState: IState = {
  theme: 'dark',
  color: 'red',
};

const a = new Promise(res => {
  console.log(6);
  res();
}).then(res => {
  console.log(1);
  Promise.resolve().then(() => {
    console.log(7);
  });
});
a;
console.log(3);
setTimeout(() => {
  console.log(4);
});

const Example = () => {
  const bc = useRef(new BroadcastChannel('AlienZHOU')).current;
  bc.onmessage = function(e) {
    const data = e.data;
    const text = '[receive] ' + data.msg + ' —— tab ' + data.from;
    console.log('[BroadcastChannel] receive message:', text);
  };
  return (
    <div>
      <input />
      <button onClick={() => bc.postMessage('hello')}>postMessage</button>
    </div>
  );
};

export default Example;
