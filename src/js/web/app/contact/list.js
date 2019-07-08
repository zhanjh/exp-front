import {getListView} from './get-list-view';
import {repo} from './repo';
import {browser_router} from 'global';

const listView = getListView();

listView.on(
  listView.allowedEvent.reload,
  (query) => browser_router().navigate('contact.list', {}, query)
);

export default async () => {
  const limit = listView.itemCountPerPage;
  const totalCount = 10000;
  const query = extractQuery();

  listView.update({
    keyword: '',
    offset: query.offset || 0,
    totalCount,
    query: query,
    contacts: await repo.listContacts(query.offset, limit, query.asc, query.desc)
  });
  return listView;
};

const extractQuery = () => {
  const url = new URL(window.location);
  const query = {};

  const offset = parseInt(url.searchParams.get('offset'));
  if (!isNaN(offset)) {
    query.offset = offset;
  }
  query.asc = url.searchParams.get('asc');
  query.desc = url.searchParams.get('desc');

  return query;
};
