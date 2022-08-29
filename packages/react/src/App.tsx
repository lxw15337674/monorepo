import React, { useEffect, useRef } from 'react';
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

const Example = () => {
  useEffect(() => {
    window.addEventListener('mousedown', (e) => {
      e.stopImmediatePropagation()
      console.log('mousedown', e);
    }, true)
    window.addEventListener('mousedown', (e) => {
      e.stopImmediatePropagation()
      console.log('mousedown2', e);
    }, true)
  }, [])

  return (
    <div>
      <input />
      <button  >postMessage</button>
    </div>
  );
};

export default Example;
