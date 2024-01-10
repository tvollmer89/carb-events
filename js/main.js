
import "regenerator-runtime/runtime.js";
import { init, clearSearch } from './functions';
import {replaceDrops} from './form-replace';
// ? Remove this dependency for test/prod? 
import Drops from './dropdowns';
let Parser = require('rss-parser');
let parser = new Parser({
  customFields: {
    item: ['id', 'country', 'eventType', 'division', 'description', 'eventLink', 'month', 'startDate', 'endDate', 'location']
  }
});

/*----------  For test site only  ----------*/
// go to https://cors-anywhere.herokuapp.com/corsdemo

// const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
// parser.parseURL(
//   CORS_PROXY + 'https://test.carboline.com/news-events/feed/',
//   function(err, feed) {
//     if (err) throw err;
//     init(feed.items);
//   }
// );


// ! REPLACE URL FOR PROD SITE to https://www.carboline.com/events-feed/
parser.parseURL('https://www.carboline.com/events-feed/', function(err, feed) {
  if (err) throw err;
  init(feed.items)
})

// TODO: run init()? Either without any arguments OR 'event' div - Maybe ditch this file altogether and start right from functions.js? 

// ! Drops() is only used for the main menu location dropdown so probably don't need this for test/prod 
Drops();
replaceDrops();


// TODO: convert html list to JSON so I can use miniSerch instead?? Other option: create a feed like I did for solution spot
const fullList = document.getElementById('event-list');
console.log(`full list: ${JSON.stringify(fullList.children)}`);

document.getElementById('clear-search').addEventListener('click', clearSearch);
