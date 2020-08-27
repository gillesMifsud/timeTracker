let today = new Date();
let selectedDate = today;
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
const tbl = document.getElementById('calendar-body'); // body of the calendar
const selectYear = document.getElementById('year');
const selectMonth = document.getElementById('month');

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

const monthAndYear = document.getElementById('monthAndYear');

const previousBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');
const yearSelect = document.getElementById('year');
const monthSelect = document.getElementById('month');

showCalendar(currentMonth, currentYear);

function next() {
    currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    let firstDay = new Date(year, month).getDay();

    // clearing all previous cells
    tbl.innerHTML = '';

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + ' ' + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement('tr');

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement('td');
                cellText = document.createTextNode('');
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                cell = document.createElement('td');
                cellText = document.createTextNode(date);
                if (
                    date === today.getDate() &&
                    year === today.getFullYear() &&
                    month === today.getMonth()
                ) {
                    cell.classList.add('bg-info');
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }

        tbl.appendChild(row); // appending each row into calendar body.
    }
    // Re map all cells to listen clicks for selectedDate
    document
        .querySelectorAll('#calendar-body td')
        .forEach(e => e.addEventListener('click', setSelectedDate));
}

// check how many days in a month code from https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

function setSelectedDate(event) {
    const day = parseInt(event.target.innerHTML);
    if (!isNaN(day)) {
        selectedDate = new Date(currentYear, currentMonth, day);
        console.log('setSelectedDate -> selectedDate', selectedDate);
    }
}

previousBtn.addEventListener('click', previous);
nextBtn.addEventListener('click', next);
yearSelect.addEventListener('change', jump);
monthSelect.addEventListener('change', jump);

document
    .querySelectorAll('#calendar-body td')
    .forEach(e => e.addEventListener('click', setSelectedDate));
