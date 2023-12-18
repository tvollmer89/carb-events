import { initSearch, runSearch } from './search';
import displayItem from './display-item';
import {clearDrops} from './form-replace';
const pager = document.getElementById('events-pager'),
  listContainer = document.getElementById('event-list'),
  numPerPage = 5,
  input = document.getElementById('events-search');
// checksContainer = document.getElementById('category-filters'),
// TODO: initialize dropdowns
// mContainer = document.getElementById('mobile-filters'),
// checks = checksContainer.querySelectorAll("input[type='checkbox']"),
// mChecks = mContainer.querySelectorAll('input[type="checkbox"]');
let allItems = [],
  matchingItems = [];
let filters = {
  t: '', //text
  type: '',
  month: '',
  division: '',
  country: ''
};

const init = feed => {
  allItems = feed;
  matchingItems = feed;
  let pageCount = Math.ceil(allItems.length / numPerPage);
  buildPage(1);
  buildPager(1, pageCount);
  initSearch(allItems);
  input.addEventListener('input', updateTextSearch);
};

/**
 * Checks filters and runs search or restarts list if there aren't any
 */
const prepSearch = () => {
  console.log(`yest it's true: ${JSON.stringify(filters)}`);
  let r = runSearch(...Object.values(filters));
  updateList(r);
};

// update matching items using item id's from search results
const updateList = results => {
  if (results.length == 0) {
    listContainer.innerHTML = `<p>No items found matching your search.</p>`;
    pager.textContent = '';
    return;
  }
  matchingItems = results.map(result => {
    return allItems.find(item => item.id === result);
  });
  if (filters.t == '') {
    let temp = matchingItems.sort((a, b) => {
      // ! reverse this if needed 
      return new Date(b.startDate) - new Date(a.startDate);
    });
    matchingItems = temp;
  }
  updatePage(1);
};

const updatePage = (newPage = 1) => {
  let pageCount = Math.ceil(matchingItems.length / numPerPage);
  buildPage(newPage, matchingItems);
  buildPager(newPage, pageCount);
};

const updateTextSearch = e => {
  filters.t = e.target.value;
  // * Only run search when more than 3 characters are entered 
  if (filters.t.length > 0 && filters.t.length < 3) {
    return;
  }
  prepSearch();
};

const handleDrops = (category, value) => {
  console.log(`filter category: ${category}, value: ${value}`);
  filters[category] = value;
  prepSearch();
}

const clearSearch = () => {
  // TODO: reset dropdown menus 
  clearDrops();
  for(const p in filters){
    filters[p] = ''
  }
  input.value = '';
  matchingItems = allItems;
  updatePage();
};

/**
 * 
 * Build Buttons for Pagination
 * @param {object} obj 
 * @returns HTML Button Element
 */
const renderButton = obj => {
  let li = document.createElement('li');
  li.classList.add('page-item');
  if (obj.class) {
    li.classList.add(obj.class);
  }
  let link = document.createElement('a');
  link.classList.add('page-link');
  link.innerHTML = obj.content;
  if (obj.page) {
    link.setAttribute('data-page', obj.page);
  }
  li.appendChild(link);
  return li;
};

/**
 * 
 * @param {int} currPage 
 * @param {int} totalPages 
 * @returns Pagination element to add to DOM
 */
const buildPager = (currPage, totalPages) => {
  if (totalPages <= 1) {
    pager.innerHTML = '';
    return;
  }
  const dots = totalPages > 5;
  const node = document.createDocumentFragment();
  let prev = renderButton({
    class: `${currPage === 1 ? 'disabled' : ''}`,
    page: currPage - 1,
    content: 'Previous'
  });
  node.appendChild(prev);
  let first = renderButton({
    class: `${currPage == 1 ? 'active' : ''}`,
    page: 1,
    content: 1
  });
  node.appendChild(first);
  if (dots && currPage > 3) {
    let dot = renderButton({
      class: 'disabled',
      content: '...'
    });
    node.appendChild(dot);
  }
  for (var p = currPage - 1; p < currPage + 2; p++) {
    if (p > 1 && p < totalPages) {
      let li = renderButton({
        class: `${p == currPage ? 'active' : ''}`,
        page: p,
        content: p
      });
      node.appendChild(li);
    }
  }
  if (dots && currPage < totalPages - 2) {
    let dot = renderButton({
      class: 'disabled',
      content: '...'
    });
    node.appendChild(dot);
  }
  let last = renderButton({
    class: `${currPage == totalPages ? 'active' : ''}`,
    page: totalPages,
    content: totalPages
  });
  node.appendChild(last);
  let next = renderButton({
    class: `${currPage == totalPages ? 'disabled' : ''}`,
    page: currPage + 1,
    content: 'Next'
  });
  node.appendChild(next);
  pager.innerHTML = '';
  pager.appendChild(node);
  addPagerEvents(pager.querySelectorAll('.page-link'));
};

/**
 * addPagerEvents
 * @param {NodeList} links 
 */
const addPagerEvents = links => {
  links.forEach(link => {
    let p = link.getAttribute('data-page')
      ? parseInt(link.getAttribute('data-page'), 10)
      : null;
    if (p) {
      link.addEventListener('click', () => updatePage(p));
    }
  });
};



const buildPage = (currPage, list = allItems) => {
  const trimStart = (currPage - 1) * numPerPage;
  const trimEnd = trimStart + numPerPage;
  listContainer.textContent = '';
  list.slice(trimStart, trimEnd).forEach(i => displayItem(i, listContainer));
};

export { init, clearSearch, handleDrops };

// buildPage(${totalPages}, list)