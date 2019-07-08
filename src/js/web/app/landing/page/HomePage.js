import {View} from 'gap/View';

const Event = {
  click: 'click'
};

export class HomePage extends View {
  constructor(props) {
    super(props);

    this.adjustSize();
    window.on('resize', () => this.adjustSize());
  }

  template() {
    return this.html`
      <div class="home">
        <a 
          on-click=${() => this.triggerClick()}
          href="javascript:;">
          <img src="https://www.expediagroup.com/wp-content/uploads/2018/03/Expedia-Group-Logo_E-Horizontal-Logo-Sticky.png" srcset="https://www.expediagroup.com/wp-content/uploads/2018/03/Expedia-Group-Logo_E-Horizontal-Logo-Sticky.png 1x" alt="Expedia Group Logo" data-retina_logo_url="" class="fusion-sticky-logo" data-logo-height="145" data-logo-width="330" style="" width="700" height="307">
        </a>
      </div>
    `;
  }

  onClick(fun) {
    this.on(Event.click, fun);
  }

  triggerClick() {
    this.trigger(Event.click);
  }

  adjustSize() {
    const winHeight = window.innerHeight;
    this.ctn.style.height = winHeight + 'px';
    this.ctn.style.lineHeight = winHeight + 'px';
  }
}

HomePage.Event = Event;
