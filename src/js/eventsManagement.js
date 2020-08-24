// https://timetracker-b6ee2.firebaseio.com/
const firebaseRef = firebase.database().ref('events');
const syncToDbBtn = document.getElementById('syncToDbBtn');
const getEventsBtn = document.getElementById('getEventsBtn');

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

syncToDbBtn.addEventListener('click', syncEvents);
getEventsBtn.addEventListener('click', getEventsFromDb);
