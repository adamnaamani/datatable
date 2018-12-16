import axios from 'axios'

export default {
	mounted() {
		return new Promise(resolve => {
			this.$store.commit('startLoading')
			this.$store.dispatch('fetchPayments')
			resolve()
		}).then(_=> {
			setTimeout(_=> {
				this.$store.commit('stopLoading')
			}, 1000)
		})
	},
	computed: {
		filteredPayments() {
			let self = this
			let search = this.$store.getters.getSearch
			let payments = this.$store.getters.getPayments
			let category = this.$store.getters.getCategory
			let direction = this.$store.getters.getDirection

      return payments.filter(function(item, index) {
      	let items = [item.id, item.name, item.description, item.date, item.amount].join(' ').toLowerCase()
      	return items.indexOf(self.$store.getters.getSearch) >= 0
      }).sort((a,b) => {
	      let modifier = 1
	      if(direction === 'desc') modifier = -1
	      if(!isNaN(a[category])) {
		      if(parseInt(a[category]) < parseInt(b[category])) return -1 * modifier
		      if(parseInt(a[category]) > parseInt(b[category])) return 1 * modifier					
	      } else {
		      if(a[category] < b[category]) return -1 * modifier
		      if(a[category] > b[category]) return 1 * modifier	      	
	      }
	      return 0
	    })      
		}
	},
	methods: {
		sortBy(param) {
			if(param === this.$store.state.sort.category) {
      	this.$store.state.sort.direction = (this.$store.state.sort.direction === 'asc') ? 'desc' : 'asc'
    	}
    	this.$store.state.sort.category = param			
		},
		editPayment(key) {
			this.$store.commit('findPayment', key)
		}
	}
}	
