<template lang="html">
  <a :href="`${baseURL}auth/${authProvider}?origin=${authOriginURL}&hashmode=${hashMode}`">
    <div id="authButton"
    :style="backgroundStyle">
      <span class="icon" :style="iconStyle"></span>
      <span class="buttonText" :style="textStyle">
        <slot></slot>
      </span>
    </div>
  </a>
</template>

<script>
import CoffeeGraderApi from '../../api/coffeeGraderApi'
import router from '../../router'

export default {
  props: ['bgColor', 'textColor', 'authProvider', 'providerIcon'],
  data () {
    return {
      baseURL: CoffeeGraderApi.defaults.baseURL
    }
  },
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
    },
    iconStyle () {
      return {
        background: `no-repeat center/110% url(${this.providerIcon})`
      }
    },
    authOriginURL () {
      if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:8080/'
      }
    },
    hashMode () {
      return router.mode === 'hash'
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
