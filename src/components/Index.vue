<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
        Coffee Grader
      </q-toolbar-title>
      <button v-if="loggedIn" @click="signOut">
        Sign out
        <i>chevron_left</i>
      </button>
      <button v-else @click="triggerModal()">
        Sign in
        <i>chevron_right</i>
      </button>
    </div>

    <router-view class="layout-view"></router-view>

    <session-modal :modalOpen="modalOpen"></session-modal>
  </q-layout>
</template>

<script>
  import sessionModal from './session/SessionModal'
  import { mapGetters } from 'vuex'
  import { Toast } from 'quasar'

  export default {
    components: {
      sessionModal
    },
    computed: {
      ...mapGetters({
        loggedIn: 'isLoggedIn'
      })
    },
    methods: {
      signOut () {
        this.$store.commit('clearAllSessionData')
        Toast.create({
          html: 'Successfully signed out',
          icon: 'eject'
        })
      },
      triggerModal () {
        this.modalOpen = true
        setTimeout(() => { this.modalOpen = false }, 500)
      }
    },
    data () {
      return {
        modalOpen: false
      }
    },
    props: ['authToken', 'clientId', 'expiry', 'uid'],

    created () {
      let propVals = Object.values(this._props)
      if (propVals.every(val => { return val !== undefined })) {
        console.log('wooo! we can call the api with these fancy keys...')
      }
    }
  }
</script>

<style lang="css">
</style>
