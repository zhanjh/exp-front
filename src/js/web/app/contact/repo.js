import {setting} from 'global';
import {Request as GapRequest} from 'gap/Request';

const apiURL =  setting().apiURL;
const newRequest = () => {
  const request = new GapRequest();
  request.addHeader('Accept', 'application/json');
  return request;
};

export const repo = {
  listContacts: async (offset, limit, asc = '', desc = '') => {
    const url = apiURL + '/contact/list';
    return await newRequest().getJson(url, {offset, limit, asc, desc});
  },
  filterContacts: async (keyword, offset, limit, asc = '', desc = '') => {
    const url = apiURL + '/contact/filter';
    return await newRequest().getJson(url, {keyword, offset, limit, asc, desc});
  }
};
