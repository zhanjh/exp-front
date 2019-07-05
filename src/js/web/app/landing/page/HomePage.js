import {View} from 'gap/View';
import {browser_router} from 'global';

export class HomePage extends View {
  template() {
    return this.html`
      <div class="ctn">
        <a
          on-click=${() => this.gotoContactList()}
          href="javascript:;">Contacts</a>
      </div>
    `;
  }

  gotoContactList() {
    browser_router().navigate('contact.list');
  }
}
