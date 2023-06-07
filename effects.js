// script.js

// Get the current page URL
var currentPage = window.location.href;

// Get all the navigation links
var navLinks = document.querySelectorAll('.navbar-nav .nav-link');

//BEFORE I FETCHED THE NAVBAR 
// Loop through each navigation link 
navLinks.forEach(function(link) {
  // Check if the link's href matches the current page URL
  if (link.href === currentPage) {
    // Add the active class to the matching link
    link.classList.add('active');
  }
});
//-------------------------------------------------

// navbar.js
function highlightActiveNavItem() {
    var currentPage = location.pathname.split('/').slice(-1)[0];
    var navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
  }
 

  document.addEventListener("DOMContentLoaded", function () {
    const calendarTable = document.querySelector(".calendar-table");
    const calendarTitle = document.querySelector(".calendar-title");
    const timeslots = document.querySelectorAll(".timeslot");
    const selectedDateDisplay = document.getElementById("selected-date");
    const selectedTimeDisplay = document.getElementById("selected-time");
  
    const currentDate = new Date();
    let selectedDate = null;
    let selectedTime = null;
  
    function updateCalendar() {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
  
      calendarTitle.textContent = new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" });
  
      const firstDayIndex = new Date(year, month, 1).getDay();
      const lastDayIndex = new Date(year, month, daysInMonth).getDay();
  
      let days = "";
      for (let i = firstDayIndex; i > 0; i--) {
        days += "<td class='empty'></td>";
      }
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const formattedDate = date.getDate();
  
        const isCurrentDate = date.toDateString() === currentDate.toDateString();
        const isSelectedDate = selectedDate !== null && date.toDateString() === selectedDate.toDateString();
  
        const className = isSelectedDate ? "selected" : isCurrentDate ? "current" : "";
  
        days += `<td class="${className}" data-date="${formattedDate}">${day}</td>`;
  
        if ((firstDayIndex + day - 1) % 7 === 6) {
          days += "</tr><tr>";
        }
      }
      for (let i = lastDayIndex; i < 6; i++) {
        days += "<td class='empty'></td>";
      }
  
      calendarTable.innerHTML = "<tr>" + days + "</tr>";
  
      const calendarCells = document.querySelectorAll(".calendar-table td:not(.empty)");
      calendarCells.forEach((cell) => {
        const date = new Date(year, month, cell.dataset.date);
  
        cell.addEventListener("click", function () {
          selectedDate = date;
          calendarCells.forEach((cell) => cell.classList.remove("selected"));
          this.classList.add("selected");
  
          selectedDateDisplay.textContent = selectedDate.toLocaleDateString("en-US");
        });
      });
    }
  
    function updateTimeslots() {
      timeslots.forEach((slot) => {
        slot.addEventListener("click", function () {
          selectedTime = this.textContent;
          timeslots.forEach((slot) => slot.classList.remove("selected"));
          this.classList.add("selected");
          selectedTimeDisplay.textContent = selectedTime;
        });
      });
    }
  
    function initCalendar() {
      updateCalendar();
      updateTimeslots();
      selectedDateDisplay.textContent = "";
      selectedTimeDisplay.textContent = "";
    }
  
    document.querySelector(".calendar-prev").addEventListener("click", function () {
      currentDate.setMonth(currentDate.getMonth() - 1);
      initCalendar();
    });
  
    document.querySelector(".calendar-next").addEventListener("click", function () {
      currentDate.setMonth(currentDate.getMonth() + 1);
      initCalendar();
    });
  
    initCalendar();
  });
  
  // Inside the updateTimeslots() function
function updateTimeslots() {
    timeslots.forEach((slot) => {
      slot.addEventListener("click", function () {
        selectedTime = this.textContent;
        timeslots.forEach((slot) => slot.classList.remove("selected"));
        this.classList.add("selected");
        selectedTimeDisplay.textContent = selectedTime;
      });
    });
  }
  
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  let selectedItem = null;
  const selectedItemDisplay = document.getElementById("selectedItemDisplay");
  
  dropdownItems.forEach((item) => {
    item.addEventListener("click", function() {
      selectedItem = item.dataset.value;
      selectedItemDisplay.textContent = "Selected item: " + selectedItem;
    });
  });
  