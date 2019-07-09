import {DetailView} from './view/DetailView';
import {browser_router} from 'global';
import {repo} from './repo';

const detailView = new DetailView();
detailView.on(
  detailView.allowedEvent.list,
  () => browser_router().navigate('contact.list')
);

export default async (route) => {
  const userID = route.params['userID'];
  const contact = await repo.fetchContact(userID);
  detailView.update({
    contact
  });
  return detailView;
};
