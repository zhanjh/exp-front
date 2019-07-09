import {ListView} from './view/ListView';
import {browser_router} from 'global';

const listView = new ListView();
listView
  .on(
    listView.allowedEvent.filter,
    (query) => browser_router().navigate('contact.filter', {}, query)
  ).on(
    listView.allowedEvent.showDetail,
    (params) => browser_router().navigate('contact.show', params)
  ).on(
    listView.allowedEvent.list,
    (query) => browser_router().navigate('contact.list', {}, query)
  );



export const getListView = () => {
  return listView;
};
