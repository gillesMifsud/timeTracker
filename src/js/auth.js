import { getEventsFromDb } from './eventsManagement.js';

const CURRENT_USER_KEY = 'currentUser';
const TOKEN_KEY = 'tokenKey';

const loginBtn = document.getElementById('loginBtn');
const activitiesContent = document.getElementById('activities-content');

const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));

const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/calendar	');
    firebase.auth().useDeviceLanguage();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
            console.log('result', result);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.accessToken;
            localStorage.setItem(TOKEN_KEY, token);

            // The signed-in user info.
            const user = {
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                refreshToken: result.user.refreshToken
            };
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
            // ...
            getEventsFromDb();
            activitiesContent.style.display = 'block';
            loginBtn.style.display = 'none';
        })
        .catch(function (error) {
            console.log('error', error);
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            // ...
            activitiesContent.style.display = 'none';
            loginBtn.style.display = 'block';
        });

    firebase
        .auth()
        .getRedirectResult()
        .then(function (result) {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const token = result.credential.accessToken;
                console.log('token', token);
                // ...
            }
            // The signed-in user info.
            const user = result.user;
        })
        .catch(function (error) {
            console.log('error', error);
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            // ...
        });
};

const signOut = () => {
    firebase
        .auth()
        .signOut()
        .then(() => {
            // Sign-out successful.
            swal({
                type: 'successfull',
                title: 'Signed Out'
            }).then(value => {
                localStorage.removeItem(CURRENT_USER_KEY);
                localStorage.removeItem(TOKEN_KEY);
                // localStorage.clear();
            });
        })
        .catch(function (error) {
            // An error happened.
            let errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: 'Error'
            });
        });
};

const manageDisplayedDomItems = () => {
    if (currentUser) {
        activitiesContent.style.display = 'block';
        loginBtn.style.display = 'none';
    } else {
        activitiesContent.style.display = 'none';
        loginBtn.style.display = 'block';
    }
};

// Fonctions execution
manageDisplayedDomItems();

// Events listeners
loginBtn.addEventListener('click', loginWithGoogle);
