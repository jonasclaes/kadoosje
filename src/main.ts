import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import './index.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { isLoggedIn, loggedInUser } from './common';

let appSetup = false;
const auth = getAuth();
onAuthStateChanged(auth, function (user) {
    isLoggedIn.value = !!user;
    loggedInUser.value = user;

    if (!appSetup) {
        createApp(App).use(router).mount('#app');
        appSetup = true;
    }
});
