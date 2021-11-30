import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import './index.css';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';

library.add(faGoogle, faGithub);

createApp(App).use(router).use(store).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
