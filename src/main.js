import Vue from 'vue'
import VueNumeric from 'vue-numeric'
import axios from 'axios'
import moment from 'moment'
import ShardsVue from 'shards-vue'
import Datatable from './components/datatable/index.vue'
import { store } from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'shards-ui/dist/css/shards.css'

Vue.config.productionTip = false
Vue.use(ShardsVue)
Vue.use(VueNumeric)

let div = document.createElement('div')
div.id = 'datatable'
document.body.appendChild(div)

const app = new Vue({
  store,
  render: h => h(Datatable)
}).$mount('#datatable')
