import Vue from 'vue'
import SignUp from '../../../src/components/session/SignUp'

describe('SignUp.vue', () => {
  it('should render a form', () => {
    const Constructor = Vue.extend(SignUp)
    const vm = new Constructor().$mount()

    assert.isNotNull(vm.$el.querySelector('form'))
  })
})
