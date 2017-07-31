<template lang="html">
  <q-layout>
    <div class="layout-view">
      <div class="layout-padding">
        <div class="card">
          <form>
            <div class="list">
              <div class="item multiple-lines">
                <div class="item-content">
                  <div class="floating-label">
                    <input required class="full-width"
                                    type="name"
                                    v-model="form.name"
                                    @input="$v.form.name.$touch()"
                                    :class="{'has-error': $v.form.name.$error}">
                    <label>Name</label>
                  </div>
                </div>
              </div>
              <div class="item multiple-lines">
                <div class="item-content">
                  <div class="floating-label">
                    <input required class="full-width"
                                    type="username"
                                    v-model="form.username"
                                    @input="$v.form.username.$touch()"
                                    :class="{'has-error': $v.form.username.$error}">
                    <label>Username</label>
                  </div>
                </div>
              </div>
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
                  <div class="floating-label">
                    <input required class="full-width"
                                    type="password"
                                    v-model="form.confirmPassword"
                                    @input="$v.form.confirmPassword.$touch()"
                                    :class="{'has-error': $v.form.confirmPassword.$error}">
                    <label>Confirm Password</label>
                  </div>
                </div>
              </div>
              <div class="item multiple-lines">
                <div class="item-content row justify-center">
                  <button class="teal width-2of5"
                          @click.prevent="signUp">
                    Sign Up
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
          <router-link :to="'/sign-in'">Already a Member?</router-link>
        </slot>
      </q-toolbar-title>
    </div>
  </q-layout>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import { Toast } from 'quasar'

export default {
  props: {
    inviteToken: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      form: {
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        inviteToken: this.inviteToken
      }
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      },
      username: {
        required
      },
      email: {
        required,
        email },
      password: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        confirmPassword: sameAs('password')
      }
    }
  },
  methods: {
    signUp () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        Toast.create('Please review fields and try again.')
        return
      }
      this.$store.dispatch('signUp', this.form)
      .then(response => Toast.create.positive(`Welcome, ${response.username}, thanks for signing up!`))
      .catch(error => {
        error.full_messages.forEach(e => Toast.create({
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
