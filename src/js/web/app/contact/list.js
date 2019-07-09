import {getListView} from './get-list-view';
import {repo} from './repo';
import {extractQuery} from './extract-query';

const listView = getListView();

export default async () => {
  const limit = listView.itemCountPerPage;
  const query = extractQuery();
  const res = await repo.listContacts(query.offset, limit, query.asc, query.desc);

  listView.update({
    keyword: '',
    pagination: {
      offset: query.offset || 0,
      total: res.total,
    },
    query: query,
    contacts: res.contacts
  });
  return listView;
};
