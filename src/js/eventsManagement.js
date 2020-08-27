// https://timetracker-b6ee2.firebaseio.com/
const firebaseRef = firebase.database().ref('events');

const addEventBtn = document.getElementById('addEventBtn');
const eventsListEl = document.getElementById('eventsList');

const dateInput = document.getElementById('dateInput');
const activityInput = document.getElementById('activityInput');
const timeInput = document.getElementById('timeInput');

const errorsEl = document.getElementById('errors');

const syncToDbBtn = document.getElementById('syncToDbBtn');
const getEventsBtn = document.getElementById('getEventsBtn');

const eventsListObj = [];

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

const syncEvents = () => {
    if (eventsListObj && eventsListObj.length > 0) {
        firebaseRef.push(eventsListObj);
    }
};

export const getEventsFromDb = () => {
    // eventsListObj.forEach(obj => {});
    firebase
        .database()
        .ref('events')
        .once('value', evts => {
            evts.forEach(ev => {
                const list = ev.val();
                list.forEach(el => {
                    // const elExists = eventsListObj.some(e => e.id === el.id);
                    // if (!elExists) {
                    //     eventsListObj.push(el);
                    //     addEventInDom(el);
                    // }
                    eventsListObj.push(el);
                    addEventInDom(el);
                });
            });
        });

    console.log(eventsListObj);
};

addEventBtn.addEventListener('click', addEvent);
syncToDbBtn.addEventListener('click', syncEvents);
getEventsBtn.addEventListener('click', getEventsFromDb);
