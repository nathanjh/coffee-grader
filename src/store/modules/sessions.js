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
      accessToken: headers['access-token'],
      tokenType: headers['token-type'],
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
        console.log(response)
        commit('updateUser', response.data.user)
        commit('updateAuth', response.headers)
        resolve(response.data)
      })
      .catch((error) => {
        console.log(error)
        reject(error.data)
      })
    })
  }
}

export default {
  state: initialState,
  mutations,
  actions
}
