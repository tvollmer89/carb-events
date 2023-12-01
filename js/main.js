import "regenerator-runtime/runtime.js";
// import { init, clearSearch } from './functions';
import Selects from './form-replace';
// ? Remove this dependency for test/prod? 
import Drops from './dropdowns';

// TODO: run init()? Either without any arguments OR 'event' div - Maybe ditch this file altogether and start right from functions.js? 

// ! Drops() is only used for the main menu location dropdown so probably don't need this for test/prod 
Drops();
Selects();


// TODO: convert html list to JSON so I can use miniSerch instead?? Other option: create a feed like I did for solution spot
const fullList = document.getElementById('event-list');
console.log(`full list: ${JSON.stringify(fullList.children)}`);
console.log(`child: ${JSON.stringify(fullList.children.item(0))}`)
// init();
// document.getElementById('clear-search').addEventListener('click', clearSearch);
