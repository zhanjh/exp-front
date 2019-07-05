import {deepMerge} from 'obj/deepMerge';
import {BrowserRouter} from './BrowserRouter';

const _browserRouter = new BrowserRouter();


const _setting = {};
export const setting = () => {
  return _setting;
};

export const bootstrap = (...args) => {
  Object.assign(_setting, deepMerge(...args));
};


export const browser_router = () => {
  return _browserRouter;
};
