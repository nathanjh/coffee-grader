<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
        Coffee Grader
      </q-toolbar-title>
      <template v-if="loggedIn">
        <img v-if="currentUser && currentUser.image"
             :src="currentUser.image"
             class="avatar">
        <i v-else>account_circle</i>
        <button @click="signOut">
          Sign out
          <i>chevron_left</i>
        </button>
      </template>
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
  import { mapGetters, mapMutations } from 'vuex'
  import { Toast } from 'quasar'

  export default {
    components: {
      sessionModal
    },
    computed: {
      ...mapGetters({
        loggedIn: 'isLoggedIn',
        currentUser: 'currentUser'
      })
    },
    methods: {
      ...mapMutations([
        'updateAuth'
      ]),
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
    props: ['authHeaders'],

    // check whether visiting this page from an OAuth callback/redirect...
    created () {
      let propVals = Object.values(this._props.authHeaders)
      if (propVals.every(val => { return val !== undefined })) {
        this.updateAuth(this._props.authHeaders)
        // use our new credentials to get the current user
        this.$router.push({path: '/'}, () => {
          this.$store.dispatch('setUserFromOAuth')
          .then(response => Toast.create.positive(`Welcome back, ${response.username}.`))
          .catch(error => {
            console.log(`Couldn't set user from uid. Status: ${error.status}, ${error.statusText}`)
          })
        })
      }
    }
  }
</script>

<style lang="css">
</style>
