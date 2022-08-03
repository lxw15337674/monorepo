import { useState, useEffect, useMemo, Dispatch, SetStateAction } from 'react';
import { unstable_batchedUpdates as batch } from 'react-dom';

type Store = Record<string, any>;
type State<T> = { [K in keyof T]: () => T[K] };
type Setter<T> = {
  [key in keyof T]: Set<Dispatch<SetStateAction<T[keyof T]>>>;
};
type Payload<T> = Partial<T> | ((prev: T) => Partial<T>);
type SetStore<T> = (payload: Payload<T>) => void;
type Reset = () => void;

function initStore<T extends Store>(store: T): [T, SetStore<T>, Reset] {
  const initialStore = JSON.stringify(store);
  const state: State<T> = {} as State<T>;
  const setter: Setter<T> = {} as Setter<T>;

  Object.keys(store).forEach((key: keyof T) => {
    if (typeof store[key] === 'function') return;

    const listeners: Set<Dispatch<SetStateAction<T[keyof T]>>> = new Set();
    setter[key] = listeners;

    const Render = () => {
      console.log(setter, key);
      const [value, setValue] = useState(store[key]);
      useEffect(() => {
        listeners.add(setValue);
        return () => {
          listeners.delete(setValue);
        };
      }, []);
      return value;
    };

    state[key] = Render;
  });

  const getResult = (payload: Payload<T>, state: T) => {
    return typeof payload === 'function' ? payload(state) : payload;
  };

  const proxyStore = new Proxy(store, {
    get(_, key: keyof T) {
      try {
        return state[key]();
      } catch (e) {
        return store[key];
      }
    },
    set(_, key: keyof T, val: T[keyof T]) {
      if (val !== store[key]) {
        const updater = () => {
          store[key] = val;
          setter[key]?.forEach?.(setValue => setValue(val));
        };

        typeof batch === 'function' ? batch(updater) : updater();
      }
      return true;
    },
  } as ProxyHandler<T>);

  const setStore = (payload: Payload<T> = {}) => {
    const result = getResult(payload, proxyStore) || {};

    if (typeof result !== 'object') {
      console.log('🚥 ---- setStore ---- result is not a object', result);

      return;
    }

    Object.keys(result).forEach((key: keyof T) => {
      // @ts-ignore
      proxyStore[key] = result[key];
    });
  };

  const reset: Reset = () => {
    setStore(JSON.parse(initialStore));
  };
  console.log(state, setter);
  return [proxyStore, setStore, reset];
}

export default initStore;
