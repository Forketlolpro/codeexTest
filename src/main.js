import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import table from './components/table.vue'
import autocomplite from './components/autocomplite.vue'

Vue.use(Vuetify);
Vue.component(`app-table`,table);
Vue.component(`app-auto-text-field`,autocomplite);

new Vue({
  el: '#app',
  render: h => h(App)
});

