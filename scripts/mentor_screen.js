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

const timeSlotButtons = document.querySelectorAll('.timeSlots .slot');

timeSlotButtons.forEach(button => {
  button.addEventListener('click', () => {
    timeSlotButtons.forEach(button => {
      button.classList.remove('selected');
    });
    
    button.classList.add('selected');
  });
});