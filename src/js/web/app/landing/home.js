import {HomePage} from './page/HomePage';
import {browser_router} from 'global';

const homePage = new HomePage();
homePage.on(HomePage.Event.click, () => browser_router().navigate('contact.list'));

export default async () => {
  return homePage;
};
