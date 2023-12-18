/**
 * 
 * @param {object} entry document/article in solution spot feed
 */
const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"];
export default function (entry, parentElement) {
  // console.log(`entry: ${JSON.stringify(entry)}}`)
  let startDate = new Date(entry.startDate);
  let startMonth = startDate.getMonth();
  let endDate = new Date(entry.endDate);
  let endMonth = endDate.getMonth();
  let eventDate = `${monthNames[startMonth]} ${startDate.getDate()}-${(startMonth == endMonth) ? "" : monthNames[endMonth] + " " }${endDate.getDate()}, ${endDate.getFullYear()}`;
  // TODO: Create shorter date from start and end dates 
  let html = ``;
  html += `<li data-country="${entry.country}" class="card card-horizontal flex-wrap col-12 align-items-center mb-3">`;
  // * date info 
  html += `<div class="card-header col-6 col-md-2 order-1"><h5 class="text-uppercase"><span class="d-none month">${entry.month}</span>${eventDate}</h5><span class="text-muted">${entry.location}</span></div>`;
  // * Event Link 
  html += `<div class="card-footer col-6 col-md-2 order-2 order-md-3 text-end">`;
  if('eventLink' in entry) {
  html += `<a href="${entry.eventLink}" target="_blank" class="btn btn-blue">Learn More</a>`;
  }
  html += `</div><div class="card-body col-12 col-md-8 order-3 order-md-2"><h3 class="name bold">${entry.title}</h3>`;
  if('division' in entry) {
    html += `<span class="division text-danger">${entry.division}</span><span> | </span>`;
  }
  if('eventType' in entry) {
    html += `<span class="type text-primary">${entry.eventType}</span>`;
  }
  html += `<br><span class="description text-muted">${entry.description}</span></div></li>`;
  parentElement.innerHTML += `${html}`;
}
