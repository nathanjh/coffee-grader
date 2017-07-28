import CoffeeGraderApi from '../../api/coffeeGraderApi'

export const STORAGE_KEY = 'coffee-grader'

let initialState = {}

if (localStorage.getItem(STORAGE_KEY)) {
  initialState = JSON.parse(localStorage.getItem(STORAGE_KEY))
}
else {
  initialState = {
    user: {
      name: null
    },
    auth: {
      isLoggedIn: false,
      headers: null
    }
  }
}

const mutations = {
  updateUser (state, user) {
    state.user = user
  },
  updateAuth (state, headers) {
    let newAuthHeaders = {
      accessToken: headers.accessToken,
      tokenType: headers.tokenType,
      client: headers.client,
      expiry: headers.expiry,
      uid: headers.uid
    }
    if (!state.auth.isLoggedIn) { state.auth.isLoggedIn = true }
    state.auth.headers = newAuthHeaders
  }
}

const actions = {
  signIn ({commit}, form) {
    console.log('sign in!')
    return new Promise((resolve, reject) => {
      CoffeeGraderApi.post('auth/sign_in.json', {
        email: form.email,
        password: form.password
      })
      .then((response) => {
        commit('updateUser', JSON.parse(response.data))
        commit('updateAuth', JSON.parse(response.headers))
        resolve(JSON.parse(response.data))
      })
      .catch((error) => {
        reject(error.response.data)
      })
    })
  }
}

export default {
  state: initialState,
  mutations,
  actions
}
