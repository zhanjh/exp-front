import {ready, oneElem} from 'gap/web';
import {bootstrap, browser_router} from 'global';
import {setting as settingObj} from './../../../setting/setting';
import {localSetting} from './../../../setting/setting.local';

bootstrap(settingObj, localSetting);

const browserRouter = browser_router();
browserRouter
  .add('/', 'home', 'landing/home')
  .add('/contact/list', 'contact.list', 'contact/list')
  .add('/contact/filter', 'contact.filter', 'contact/filter')
  .add('/contact/detail/{userID:[0-9]+}', 'contact.show', 'contact/show');

const mainElem = oneElem('.page .main');
browserRouter.onDispatch(async (route) => {
  const module = await import('./app/' + route.action);
  const pageView = await module.default(route);
  if (pageView) {
    mainElem.innerHTML = '';
    pageView.appendTo(mainElem);
  }
});

ready(() => {
  browserRouter.refresh();
});
