import Vue from 'vue'
import SignUp from '../../../src/components/session/SignUp'

describe('SignUp.vue', () => {
  it('has a created hook', () => {
    // const Constructor = Vue.extend(SignUp)
    // const vm = new Constructor().$mount()

    expect(SignUp.created).to.be.a('function')
  })
})
