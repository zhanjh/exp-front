export const extractQuery = () => {
  const url = new URL(window.location);
  const query = {};

  const offset = parseInt(url.searchParams.get('offset'));
  if (!isNaN(offset)) {
    query.offset = offset;
  }
  query.asc = url.searchParams.get('asc');
  query.desc = url.searchParams.get('desc');
  const keyword = url.searchParams.get('keyword');
  if (keyword) {
    query.keyword = keyword;
  }

  return query;
};
