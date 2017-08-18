<template lang="html">
  <q-modal ref="sessionModal"
           :content-css="{minHeight: modalHeight, minWidth: '60vw'}"
           v-on:close="clearFormOnClose()">
    <q-layout>
      <div slot="header" class="toolbar">
        <q-toolbar-title class="text-center">{{ headerTitle }}</q-toolbar-title>
        <button @click="$refs.sessionModal.close()">
          <i>close</i>
        </button>
      </div>

      <div class="layout-view">
        <div class="layout-padding">
          <sign-up v-if="signingUp"
                   v-on:successfulSignUp="$refs.sessionModal.close()">
            <div>
              <a @click="signingUp = false">Already a Member?</a>
            </div>
          </sign-up>
          <sign-in v-else
                   v-on:successfulSignIn="$refs.sessionModal.close()">
            <div>
              <a @click="signingUp = true">Need to create an account?</a>
            </div>
          </sign-in>
        </div>
      </div>
    </q-layout>
  </q-modal>

</template>

<script>
import signIn from './SignIn'
import signUp from './SignUp'
import { eventBus } from '../../eventBus'

export default {
  props: ['modalOpen'],
  components: {
    signIn,
    signUp
  },
  data () {
    return {
      signingUp: false
    }
  },
  computed: {
    headerTitle () {
      return this.signingUp ? 'Sign up for an account' : 'Sign in to your account'
    },
    modalHeight () {
      return this.signingUp ? '97vh' : '75vh'
    }
  },
  watch: {
    modalOpen () {
      if (this.modalOpen) this.$refs.sessionModal.open()
    }
  },
  methods: {
    clearFormOnClose () {
      eventBus.$emit('clearForm')
    }
  }
}
</script>

<style lang="css">
</style>
