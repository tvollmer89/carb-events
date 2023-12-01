// TODO: import filter funcion from 'functions'
const wrap = (el, wrapper) => {
  el.parentElement.insertBefore(wrapper, el);
  wrapper.appendChild(el);
};
/**
 * 
 * @param {string} type Element Type
 * @param {array} classes Array of classes
 * @param {string} inner Basic HTML to add inside element
 * @param {string} text Text to add inside element
 * @param {string/int} rel Option Value
 * @returns HTMLElement
 */
const createEl = (type, classes, inner = '', text = '', rel) => {
  let el = document.createElement(type);
  if (classes.length > 0) {
    el.classList.add(...classes);
  }
  if (inner != '') {
    el.innerHTML = inner;
  }
  if (text != '') {
    el.textContent = text;
  }
  if (rel) {
    el.setAttribute('rel', rel);
  }
  return el;
};
export default function() {
  var selects = document.querySelectorAll('select');
  selects.forEach(function(selectItem, idx, selectObj) {
    const filterCategory = selectItem.id;
    const numberOfOptions = selectItem.childElementCount;

    // Hide defualt select menu
    selectItem.classList.add('select-hidden');
    let newSelect = document.createElement('div');
    newSelect.classList.add('select');
    wrap(selectItem, newSelect);

    let container = createEl('div', ['select-styled']);
    container.appendChild(
      createEl(
        'span',
        ['d-inline-block', 'form-control', 'dropdown-text'],
        '',
        selectItem.children[0].text
      )
    );
    container.appendChild(
      createEl(
        'span',
        ['d-inline-block', 'px-2', 'px-1', 'select-icon'],
        '<i class="bi bi-caret-down-fill"></i>'
      )
    );
    selectItem.after(container);

    let optionList = createEl('ul', ['select-options']);
    container.after(optionList);

    // Add list items (options) to new dropdown
    for (let i = 0; i < numberOfOptions; i++) {
      optionList.appendChild(
        createEl(
          'li',
          [],
          '',
          selectItem.children[i].text,
          selectItem.children[i].value
        )
      );
    }
    // * styledSelect = new select element added by JS
    let styledSelect = selectItem.nextElementSibling;
    // * the span element that displays current selection
    let selectTextParent = styledSelect.firstElementChild;
    let optionItems = optionList.children;

    // Adding event listener to each li element
    for (let i = 0; i < numberOfOptions; i++) {
      let opt = optionItems[i];
      opt.addEventListener('click', e => {
        let selectedOpt = e.target;
        let val = selectedOpt.hasAttribute('rel')
          ? selectedOpt.getAttribute('rel')
          : '';
        console.log(`value: ${val}`);
        e.stopPropagation();
        styledSelect.classList.remove('active');
        selectTextParent.textContent = selectedOpt.textContent;
        // TODO: call the filterList function on click
        selectedOpt.parentElement.style.display = 'none';
      });
    }

    // Adding event listener to new select (now UL) element
    styledSelect.addEventListener('click', e => {
      e.stopPropagation();
      let current = e.target.parentElement;
      document.querySelectorAll('.select-styled.active').forEach(s => {
        if (s != current) {
          s.classList.remove('active');
          s.nextElementSibling.style.display = 'none';
        }
      });
      current.classList.toggle('active');
      current.nextElementSibling.style.display = 'block';
    });

    // Add event listener to document
    document.addEventListener('click', e => {
      styledSelect.classList.remove('active');
      optionList.style.display = 'none';
    });
  });
}
