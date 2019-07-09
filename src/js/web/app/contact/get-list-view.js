import {ListView} from './view/ListView';
import {browser_router} from 'global';

const listView = new ListView();
listView
  .on(
    listView.allowedEvent.filter,
    (query) => browser_router().navigate('contact.filter', {}, query)
  ).on(
    listView.allowedEvent.list,
    (query) => browser_router().navigate('contact.list', {}, query)
  );

/*
listView
  .on(
    listView.allowedEvent.reload,
    (query) => browser_router().navigate('contact.list', {}, query)
  ).on(
    listView.allowedEvent.filter,
    (query) => browser_router().navigate('contact.filter', {}, query)
  );
*/



export const getListView = () => {
  return listView;
};
