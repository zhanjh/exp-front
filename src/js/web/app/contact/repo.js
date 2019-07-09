import {setting} from 'global';
import {Request as GapRequest} from 'gap/Request';

const apiURL =  setting().apiURL;
const newRequest = () => {
  const request = new GapRequest();
  request.addHeader('Accept', 'application/json');
  return request;
};

const filterQuery = (query) => {
  const res = {};
  Object.keys(query)
    .filter(key => query[key] || false)
    .forEach(key => res[key] = query[key]);
  return res;
};

export const repo = {
  listContacts: async (offset, limit, asc, desc) => {
    const url = apiURL + '/contact/list';
    return await newRequest().getJson(url, filterQuery({offset, limit, asc, desc}));
  },
  filterContacts: async (keyword, offset, limit, asc, desc) => {
    const url = apiURL + '/contact/filter';
    return await newRequest().getJson(url, filterQuery({keyword, offset, limit, asc, desc}));
  }
};
