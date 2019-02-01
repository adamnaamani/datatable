import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Datatable from './datatable/index.vue'

describe('The only true wisdom is in knowing you know nothing.', () => {
	Vue.use(Vuex)
	
  it('true dat', () => {
    expect(true).to.equal(true)
  })
})
