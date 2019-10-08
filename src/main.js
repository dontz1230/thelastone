import Vue from 'vue'
import App from './App.vue'
import router from './routes.js'
import store from './components/Store/store.js'

//使用component globally
import Button from './components/UI/Button.vue'
Vue.component('app-btn', Button);

//使用Vue matertial
import { MdCard, MdButton, MdContent, MdDialog, MdTable, MdDialogConfirm } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(MdCard)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdDialog)
Vue.use(MdTable)
Vue.use(MdDialogConfirm)

//使用Vue Resourse
import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.http.options.root = 'https://player-f14a1.firebaseio.com'

//使用Vuelidate
import vuelidate from 'vuelidate'
Vue.use(vuelidate);

//使用WYSIWYG編輯器
import wysiwyg from 'vue-wysiwyg';
Vue.use(wysiwyg);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
