import {getListView} from './get-list-view';
import {repo} from './repo';
import {browser_router} from 'global';
import {extractQuery} from './extract-query';

const listView = getListView();

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
