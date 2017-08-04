<template lang="html">
  <div id="authButton"
       :style="backgroundStyle"
       @click="oauthSignIn(authProvider)">
    <span class="icon"></span>
    <span class="buttonText" :style="textStyle">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: ['bgColor', 'textColor', 'authProvider'],
  computed: {
    backgroundStyle () {
      return {
        background: this.bgColor
      }
    },
    textStyle () {
      return {
        color: this.textColor
      }
    }
  },
  methods: {
    oauthSignIn (provider) {
      console.log(`signing in to coffee-grader-api/auth/${provider}`)
    }
  }
}
</script>

<style lang="css">
#authButton {
  display: inline-block;
  background: white;
  color: #444;
  width: 190px;
  border-radius: 2px;
  /*border: thin solid #888;*/
  white-space: nowrap;
}
#authButton:hover {
  box-shadow: 0 2px 28px rgba(0,0,0,0.25), 0 2px 10px rgba(0,0,0,0.22);
  cursor: pointer;
}
#authButton:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}
span.label {
  font-family: serif;
  font-weight: normal;
}
span.icon {
  background: no-repeat center/110% url('../../statics/btn_google_light_normal.png');
  display: inline-block;
  vertical-align: middle;
  width: 42px;
  height: 42px;
}
span.buttonText {
  display: inline-block;
  vertical-align: middle;
  padding-left: 6px;
  font-size: 15px;
  font-weight: bold;
}

</style>
