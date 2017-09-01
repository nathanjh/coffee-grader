import Vue from 'vue'
// import { mount } from 'vue-test-utils'
import SignUp from '../../../src/components/session/SignUp'
import { eventBus } from '../../../src/eventBus'

const Constructor = Vue.extend(SignUp)

describe('SignUp.vue', () => {
  describe('lifecycle hooks: created', () => {
    it('has a created hook', () => {
      expect(SignUp.created).to.be.a('function')
    })
    it("listens for a 'clearForm' event", () => {
      const vm = new Constructor({
        data: {
          form: {
            name: 'whatever'
          }
        }
      }).$mount()

      expect(vm.form.name).to.eq('whatever')
      eventBus.$emit('clearForm')
      expect(vm.form.name).to.eq('')
    })
  })
})
