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
      <button v-else @click="$refs.signinModal.open()">
        Sign in
        <i>chevron_right</i>
      </button>
    </div>

    <router-view class="layout-view"></router-view>

    <!--
      Replace following "div" with
      "<router-view class="layout-view">" component
      if using subRoutes
    -->
    <q-modal ref="signinModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
    <q-layout>
      <div slot="header" class="toolbar">
        <q-toolbar-title class="text-center">Sign In</q-toolbar-title>
        <button @click="$refs.signinModal.close()">
          <i>close</i>
        </button>
      </div>

      <div class="layout-view">
        <div class="layout-padding">
          <sign-in></sign-in>
        </div>
      </div>
    </q-layout>
  </q-modal>

  </q-layout>
</template>

<script>
  import signIn from './session/SignIn'
  import { mapGetters } from 'vuex'
  import { Toast } from 'quasar'

  export default {
    components: {
      signIn
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
      }
    }
  }
</script>

<style lang="stylus">
.logo-container
  width 192px
  height 268px
  perspective 800px
  position absolute
  top 50%
  left 50%
  transform translateX(-50%) translateY(-50%)
.logo
  position absolute
  transform-style preserve-3d
</style>
