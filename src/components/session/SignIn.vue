<template lang="html">
  <q-layout>
    <div class="layout-view">
      <div class="layout-padding">
        <form>
          <div class="list">
            <div class="item multiple-lines">
              <div class="item-content">
                <div class="floating-label">
                  <input required class="full-width"
                                  type="email"
                                  v-model="form.email"
                                  @input="$v.form.email.$touch()"
                                  :class="{'has-error': $v.form.email.$error}">
                  <label>Email</label>
                </div>
              </div>
            </div>
            <div class="item multiple-lines">
              <div class="item-content">
                <div class="floating-label">
                  <input required class="full-width"
                                  type="password"
                                  v-model="form.password"
                                  @input="$v.form.password.$touch()"
                                  :class="{'has-error': $v.form.password.$error}">
                  <label>Password</label>
                </div>
              </div>
            </div>
            <div class="item multiple-lines">
              <div class="item-content">
                <button class="teal" @click="signIn">Sign In</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import { Toast } from 'quasar'

export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: {
        required,
        minLength: minLength(6) }
    }
  },
  methods: {
    signIn () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        Toast.create('Please review fields and try again.')
        return
      }
      console.log(`SENT>> email: ${this.form.email}, password: ${this.form.password}`)
      this.$store.dispatch('signIn', this.form)
      .then((response) => console.log(response))
      .catch((error) => {
        error.forEach(e => Toast.create(e))
      })
    }
  }
}
</script>

<style lang="css">
</style>
