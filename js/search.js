import MiniSearch from 'minisearch'
const stopWords = new Set(['and', 'or', 'to', 'in', 'a', 'the'])
const defaultTokenize = MiniSearch.getDefault('tokenize');
let miniSearch = new MiniSearch({
  fields: ['title', 'id', 'eventType', 'division', 'country', 'description', 'month'],
  storeFields: ['title', 'id', 'eventType', 'month', 'country', 'division'],
  searchOptions: {
    boost: {
      title: 2
    },
    prefix: term => term.length > 3,
    fuzzy: 1
  },
  extractField: (doc, fieldName) => {
    return doc[fieldName];
  }
});

const initSearch = list => {
  miniSearch.addAll(list);
  console.log(`init search: ${list}`)

  // testing
  let results = miniSearch.search('Carboline', {
    fields: ['division'],
    fuzzy: false
  });
  // console.log(`test: ${results}`);
};

/**
 * 
 * @param {string} text Text Search String
 * @param {string} type (optional) Current tab (i.e. articles, podcast, etc.) 
 * @param {array} categories (optional) Array of any category checkboxes selected
 * @returns an array of Id's identifying matching items
 */
const runSearch = (text, type, m, d, l) => {
  let textQuery = text == '' ? MiniSearch.wildcard : text;
  const filters = {
    eventType: type,
    month: m.toString(),
    division: d,
    country: l
  };
  let filterValues = Object.values(filters);
  console.log(`filter are empty? : ${filterValues.every(x => x == '')}`)

  // if(filterValues.every(x => x == '')){
  //   let results = miniSearch.search(textQuery)
  //   return results.map(r => r.id);
  // }

  let results = miniSearch.search(textQuery, {
    filter: (result) => {
      console.log(`filters on search: ${JSON.stringify(filters)}`)
      let pass = true;
      for(const prop in filters) {
        if(filters[prop] == ''){continue}
        if(!result.hasOwnProperty(prop)) {pass = false; break;}
        if((prop == 'eventType' || prop == 'division') && !result[prop].includes(filters[prop])){
            pass=false;
            break;
        }
        if((prop == 'month' || prop == 'country') && result[prop] != filters[prop]){
          pass=false;
          break;
        }
    }
    return pass;
  }});
  console.log(`results: ${JSON.stringify(results)}`)
  return results.map(r => r.id);
};

export { initSearch, runSearch };