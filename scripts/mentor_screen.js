var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

const dateLinks = document.getElementsByClassName("date");

function currentDate(date) {
  for ( dateLink of dateLinks){
    dateLink.classList.remove("current");
  }
  event.currentTarget.classList.add("current");
  document.getElementById(date).classList.add("current");
}