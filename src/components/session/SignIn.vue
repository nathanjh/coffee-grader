<template lang="html">
  <q-layout>
    <div class="layout-view">
      <div class="layout-padding">
        <div class="card">
          <form>
            <div class="list bordered">
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
                <div class="item-content row justify-center">
                  <button class="teal width-2of5"
                          @click.prevent="signIn">
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div slot="footer" class="toolbar light">
      <q-toolbar-title class="text-center">
        <slot>
          <router-link :to="'/sign-up'">Need to create an account?</router-link>
        </slot>
      </q-toolbar-title>
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
      this.$store.dispatch('signIn', this.form)
      .then(response => Toast.create.positive(`Welcome back, ${response.username}.`))
      .catch(error => {
        error.forEach(e => Toast.create({
          html: e,
          icon: 'error_outline'
        }))
      })
    }
  }
}
</script>

<style lang="css">
</style>
