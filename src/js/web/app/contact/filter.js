import {getListView} from './get-list-view';
import {repo} from './repo';
import {extractQuery} from './extract-query';

const listView = getListView();

export default async () => {
  const limit = listView.itemCountPerPage;
  const totalCount = 10000;
  const query = extractQuery();

  listView.update({
    keyword: query.keyword,
    offset: query.offset || 0,
    totalCount,
    query: query,
    contacts: await repo.filterContacts(query.keyword, query.offset, limit, query.asc, query.desc)
  });
  return listView;
};
