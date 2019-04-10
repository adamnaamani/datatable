# Vue Datatable Component

> [Datatable Component hosted on Heroku](https://britecore-application.herokuapp.com/) (allow a few seconds for instance to start)

## Tech

* [Vue](https://vuejs.org)
* [Firebase](https://firebase.google.com)
* [Heroku](https://www.heroku.com/home)
* [Shards](https://github.com/DesignRevision/shards-vue)
* [Axios](https://github.com/axios/axios)
* [Moment](https://github.com/moment/moment)
* [VueNumeric](https://github.com/kevinongko/vue-numeric)


## Function
**Search**

* Dynamic full-text search for every column.

**Sorting**

* Click on column header to sort.

**Editing**

* All changes are saved to Firebase once a cell is edited.


## Example

Fetching Payments
```javascript
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
}
```

Editing Payments
```javascript
editPayment: ({commit}, payload) => {
  firestore.collection('payments').doc(payload.id).set({
    id: payload.id,
	name: payload.name,
    description: payload.description,
	date: moment(payload.date).format(),
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
```