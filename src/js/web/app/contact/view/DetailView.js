import {View} from 'gap/View';
import {getAge} from './../fun/get-age';

const Event = {
  list: 'list',
};

export class DetailView extends View {
  get allowedEvent() {
    return Event;
  }

  list() {
    this.trigger(this.allowedEvent.list);
  }

  getAge(birthDate) {
    return getAge(birthDate);
  }

  generateDetails(details) {
    return details.map(detail => `
      <li>
        ${detail.type} <strong>${detail.content}</strong>
      </li>
    `).join('');
  }

  getFavorTag(isFavorite) {
    return isFavorite ?
      '<i class="icon favor active"></i>' :
      '<i class="icon favor"></i>';
  }

  template() {
    return this.html`
    <div class="ctn contact-detail">
      <br>
      <nav aria-label="You are here:" role="navigation">
        <ul class="breadcrumbs">
          <li><a href="javascript:;" on-click=${() => this.list()}>Contacts</a></li>
          <li>
            <span class="show-for-sr">Current: </span> $${'contact.name'}
          </li>
        </ul>
      </nav>

      <div class="card">
        <div class="card-section">
          <h1>
            $${'contact.title'} $${'contact.name'} <span></span>
            <span watch="contact.isFavorite">
              ${isFavorite => this.getFavorTag(isFavorite)}
            </span>
          </h1>
            <div>
              Age: <strong>$${this.filter({'contact.birthDate': birthDate => this.getAge(birthDate)})}</strong>
              Detail Count: <strong>$${'contact.detailCount'}</strong>
            </div>

            <hr>

              <ul class="vertical menu" watch="contact.details">
                ${(details) => this.generateDetails(details)}
              </ul>
            </div>
          </div>
    </div>
    `;
  }
}
