import { createStore } from 'redux';
import { rootReducer } from './reducers/rootReducer';

export const store = createStore(rootReducer);

type TProperties<T> = T extends {
  [key: string]: infer U;
}
  ? U
  : never;

export type TActions<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<TProperties<T>>;

export type TApp = ReturnType<typeof rootReducer>;
