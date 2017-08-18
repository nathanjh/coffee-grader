<template lang="html">
  <q-layout>
    <div class="layout-view">
      <div class="layout-padding">
        <div class="card">
          <div class="item multiple-lines">
            <div class="item-content row justify-center">
              <auth-button :bgColor="'#027be3'"
                           :textColor="'#ffffff'"
                           :authProvider="'google_oauth2'"
                           :providerIcon="'../../statics/btn_google_light_normal.png'">
                Sign in with Google
              </auth-button>
            </div>
          </div>
        </div>
        <div class="row text-faded text-italic justify-center">
          or
        </div>
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
import authButton from './AuthButton'
import { eventBus } from '../../eventBus'

export default {
  components: {
    authButton
  },
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
      .then(response => {
        this.$emit('successfulSignIn')
        Toast.create.positive(`Welcome back, ${response.username}.`)
      })
      .catch(error => {
        error.forEach(e => Toast.create({
          html: e,
          icon: 'error_outline'
        }))
      })
    }
  },
  created () {
    eventBus.$on('clearForm', () => {
      for (let field in this.form) this.form[field] = ''
      this.$v.form.$reset()
    })
  }
}
</script>

<style lang="css">
  .oauth-button {
    cursor: pointer;
  }
</style>
