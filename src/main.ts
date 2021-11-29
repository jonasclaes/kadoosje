import {createApp} from 'vue';
import App from './App.vue';
import router from './router/index';
import './index.css';

// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env['FIREBASE_APP_API_KEY'],
    authDomain: process.env['FIREBASE_APP_AUTH_DOMAIN'],
    projectId: process.env['FIREBASE_APP_PROJECT_ID'],
    storageBucket: process.env['FIREBASE_APP_STORAGE_BUCKET'],
    messagingSenderId: process.env['FIREBASE_MESSAGING_SENDER_ID'],
    appId: process.env['FIREBASE_APP_APP_ID'],
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

let appSetup = false;
const auth = getAuth();
onAuthStateChanged(auth, function (user) {
    if (!appSetup) {
        createApp(App).use(router).mount('#app');
        appSetup = true;
    }
});
