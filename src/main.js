import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import table from './components/table.vue'

Vue.use(Vuetify);
Vue.component(`app-table`,table);

new Vue({
  el: '#app',
  render: h => h(App)
});


