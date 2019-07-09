import {View} from 'gap/View';

const itemCountPerPage = 10;
const query = {
  offset: 0,
  asc: '',
  desc: '',
  keyword: ''
};

const Event = {
  //reload: 'reload',
  filter: 'filter',
  list: 'list'
};

export class ListView extends View {
  template() {
    return this.html`
      <div class="ctn contac-list">
        <br>
          <form action="javascript:;" on-submit=${(e, elem) => this.submit(e, elem)}>
          <div class="input-group">
            <input class="input-group-field" placeholder="Search contacts by name" type="search"
              ref=${input => this.keywordInput = input}
              bind-value="keyword">
            <div class="input-group-button">
              <input type="submit" class="button" value="search">
            </div>
          </div>
        </form>

        <div class="list-wrap" watch="contacts" on-click=${e => this.clickTable(e)}>
          ${contacts => this.generateTable(contacts)}
        </div>

        <nav aria-label="Pagination" watch="offset" on-click=${e => this.clickPagination(e)}>
          ${offset => this.generatePagination(offset)}
        </nav>
      </div>
    `;
  }

  get itemCountPerPage() {
    return itemCountPerPage;
  }

  get allowedEvent() {
    return Event;
  }

  submit() {
    const keyword = this.keywordInput.value.trim();
    const query = this.resetQuery({keyword});

    this.reload(query);
  }

  resetQuery(reset) {
    query.offset = 0;
    query.asc = '';
    query.desc = '';
    query.keyword = '';
    Object.keys(query).forEach(key => {
      if (Object.prototype.hasOwnProperty.call(reset, key)) {
        query[key] = reset[key];
      }
    });
    return query;
  }

  clickTable(evt) {
    const target = evt.target;
    const sortAttr = target.getAttribute('data-sort');

    if (sortAttr) {
      if (target.hasClass('sort')) {
        this.resort(sortAttr, 'asc');
      } else if (target.hasClass('sort-asc')) {
        this.resort(sortAttr, 'desc');
      } else if (target.hasClass('sort-desc')) {
        this.resort(sortAttr, '');
      }
    }
  }

  resort(attr, type) {
    query.asc = '';
    query.desc = '';
    if (type) {
      query[type] = attr;
    }

    query.offset = 0;
    //this.trigger(this.allowedEvent.reload, query);
    this.reload(query);
  }

  getFavorTag(contact) {
    return contact.isFavorite ?
      '<i class="icon favor active"></i>' :
      '<i class="icon favor"></i>';
  }

  generateTable(contacts) {
    const rows = contacts.map(contact => {
      return `<tr class="item">
          <td>${contact.title}</td>
          <td>${contact.name}</td>
          <td>${this.getAge(contact.birthDate)}</td>
          <td><a href="#">${contact.detailCount}</a></td>
          <td>${this.getFavorTag(contact)}</td>
        </tr>
      `;
    });

    return this.html`<table>
        <thead>
          <tr>
            <th>Title ${this.generateSortIcon('title')}</th>
            <th>Name ${this.generateSortIcon('name')}</th>
            <th>Age ${this.generateSortIcon('birthDate')}</th>
            <th>Details</th>
            <th>Favor ${this.generateSortIcon('isfavorite')}</th>
          </tr>
        </thead>
        <tbody>
        ${rows}
        </tbody>
      </table>
    `;
  }

  generateSortIcon(sort) {
    if (sort === this.data.query.asc) {
      return `<i class="icon sort-asc" data-sort="${sort}"></i>`;
    } else if (sort === this.data.query.desc) {
      return `<i class="icon sort-desc" data-sort="${sort}"></i>`;
    } else {
      return `<i class="icon sort" data-sort="${sort}"></i>`;
    }
  }

  getAge(birthDateIn) {
    const today = new Date();
    const birthDate = new Date(birthDateIn);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }

    return age;
  }

  generatePagination(offset) {
    const currentPage = Math.ceil(offset / this.itemCountPerPage) + 1;
    const totalPage = Math.ceil(this.data.totalCount / this.itemCountPerPage);
    this.currentPage = currentPage;

    //console.log(currentPage, totalPage);

    const prev = currentPage === 1 ? 
      '<li class="pagination-previous disabled">Previous <span class="show-for-sr">page</span></li>' :
      '<li class="pagination-previous"><a class="paginate" href="javascript:;">Previous</a></li>';
    const next = currentPage === totalPage ?
      '<li class="pagination-next disabled">Next <span class="show-for-sr">page</span></li>' :
      '<li class="pagination-next"><a class="paginate" href="javascript:;" aria-label="Next page">Next</a></li>';

    let pages = [];
    if (totalPage <= 9) {
      pages = [...Array(totalPage).keys()].map(index => index + 1);
    } else if (currentPage < 6) {
      pages = [1, 2, 3, 4, 5, 6, 0, totalPage - 2, totalPage - 1, totalPage];
    } else if (currentPage > totalPage - 5) {
      pages = [1, 2, 3, 0, totalPage - 5, totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
    } else {
      pages = [1, 2, 3, 0, currentPage - 1, currentPage, currentPage + 1, 0, totalPage - 2, totalPage - 1, totalPage];
    }

    const pageHTML = pages.map(index => {
      if (index === 0) {
        return '<li class="ellipsis" aria-hidden="true"></li>';
      }

      if (index === currentPage) {
        return `<li class="current"><span class="show-for-sr">You're on page</span> ${index}</li>`;
      } else {
        return `<li><a class="paginate" href="javascript:;" aria-label="Page ${index}">${index}</a></li>`;
      }
    }).join('');

    return this.html`
      <ul class="pagination">
        ${prev}
        ${pageHTML}
        ${next}
      </ul>
    `;
  }

  clickPagination(evt) {
    const target = evt.target;
    if (target.hasClass('paginate')) {
      this.paginate(target.innerHTML.trim());
    }
  }

  paginate(page) {
    const pageIndex = parseInt(page);
    const currentPage = this.currentPage;

    let targetPage = 0;
    if (!isNaN(pageIndex)) {
      //offset = (pageIndex - 1) * this.itemCountPerPage;
      targetPage = pageIndex;
    } else if (page === 'Previous') {
      targetPage = currentPage - 1;
    } else {
      targetPage = currentPage + 1;
    }
    query.offset = (targetPage - 1) * this.itemCountPerPage;
    //this.trigger(Event.reload, query);
    this.reload(query);
  }
  
  reload(query) {
    if (query.keyword) {
      this.trigger(this.allowedEvent.filter, query);
    } else {
      this.trigger(this.allowedEvent.list, query);
    }
  }
}
