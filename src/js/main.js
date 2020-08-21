const addEventBtn = document.getElementById('addEventBtn');
const eventsListEl = document.getElementById('eventsList');
const eventsListObj = [];

const dateInput = document.getElementById('dateInput');
const activityInput = document.getElementById('activityInput');
const timeInput = document.getElementById('timeInput');

const errorsEl = document.getElementById('errors');

const addEvent = () => {
    if (userInputIsValid()) {
        const newEvent = {
            id: Date.now(),
            date: dateInput.value,
            activity: activityInput.value,
            time: timeInput.value
        };

        const eventExists = eventsListObj.some(
            e => e.id === newEvent.id && e.date === newEvent.date
        );

        if (!eventExists) {
            eventsListObj.push(newEvent);
            addEventInDom(newEvent);
        }
    }

    console.log(eventsListObj);
};

const addEventInDom = newEv => {
    const newDomEl = document.createElement('tr');
    newDomEl.innerHTML = `
    <td>${newEv.date}</td>
    <td>${newEv.activity}</td>
    <td>${newEv.time}</td>
  `;
    eventsListEl.appendChild(newDomEl);
};

const userInputIsValid = () => {
    errorsEl.innerHTML = '';
    if (!dateInput.value || dateInput.value === '') {
        addErrorMsg('Please enter a date');
        return false;
    }
    if (!activityInput.value || activityInput.value === '') {
        addErrorMsg('Please enter an activity');
        return false;
    }
    if (!timeInput.value || timeInput.value === '') {
        addErrorMsg('Please enter the time of activity');
        return false;
    }
    return true;
};

const addErrorMsg = errMsg => {
    const el = document.createElement('p');
    el.innerHTML = errMsg;
    errorsEl.appendChild(el);
};

addEventBtn.addEventListener('click', addEvent);
