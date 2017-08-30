import Vue from 'vue'

Vue.config.productionTip = false

// require all test files (files that end with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)