import Vue from 'vue'
import Vuex from 'vuex'
import VueFire from 'vuefire'
import VueNumeric from 'vue-numeric'
import moment from 'moment'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import axios from 'axios'
import Datatable from './components/datatable/index.vue'
import ShardsVue from 'shards-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'shards-ui/dist/css/shards.css'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueFire)
Vue.use(ShardsVue)
Vue.use(VueNumeric)

firebase.initializeApp({
  apiKey: 'AIzaSyBTOh2WE0m8A4qF6rq6MIJAPscMFHAqOEM',
  authDomain: 'vue-application-7a3c2.firebaseapp.com',
  databaseURL: 'https://vue-application-7a3c2.firebaseio.com',
  projectId: 'vue-application-7a3c2',
  storageBucket: 'vue-application-7a3c2.appspot.com',
  messagingSenderId: '704800369746'
})
const firestore = firebase.firestore()

const store = new Vuex.Store({
	state: {
		loading: false, saved: false,
		url: 'https://s3-us-west-1.amazonaws.com/seizo/json/payments-data.json',
		sort: { category: 'date', direction: 'desc' },
		search: '',
		payments: []
	},
	actions: {
		uploadPayments: ({commit}) => {
			axios.get(store.state.url).then(({data}) => {
				data.forEach((record) => {
					firestore.collection('payments').doc(record.ID).set({
						id: record.ID,
						name: record.Name,
						description: record.Description,
						date: record.Date,
						amount: record.Amount
					}).then(function() {
					    console.log('Document successfully written!')
					}).catch(function(error) {
					    console.error('Error writing document: ', error)
					})
				})
			})	
		},
		fetchPayments: ({commit}) => {
      let paymentsArray = []
      firestore.collection('payments').get().then(function(documents) {
      	documents.forEach(function(document) {
      		let object = document.data()
      		object.document_id = document.id
      		paymentsArray.push(object)
      	})
      	store.commit('addPayments', paymentsArray)
      })
		},
		editPayment: ({commit}, payload) => {
			firestore.collection('payments').doc(payload.id).set({
				id: payload.id,
			  name: payload.name,
			  description: payload.description,
			  date: payload.date,
			  amount: payload.amount
			}, { merge: true }).then(function() {
				store.state.saved = true
				setTimeout(_=> {
					store.state.saved = false
				}, 3000)
			  console.log('Document successfully written!')
			}).catch(function(error) {
			  console.error('Error writing document: ', error)
			})
		}		
	},
	mutations: {
		startLoading: (state, payload) => {
			state.loading = true
		},
		stopLoading: (state, payload) => {
			state.loading = false
		},
		filterSearch: (state, payload) => {
			state.payments = ''
		},		
		addPayments: (state, payload) => {
			state.payments = payload
		},
		findPayment: (state, payload) => {
			let payment = store.state.payments.find(x => x.id === payload)
			store.dispatch('editPayment', payment)
		}		
	},
	getters: {
		getSearch: (state) => {
			return state.search.toLowerCase()
		},
		getPayments: (state) => {
			return state.payments
		},
		getCategory: (state) => {
			return state.sort.category
		},
		getDirection: (state) => {
			return state.sort.direction
		}
	}
})

let div = document.createElement('div')
div.id = 'datatable'
document.body.appendChild(div)

const app = new Vue({
  store,
  render: h => h(Datatable)
}).$mount('#datatable')
