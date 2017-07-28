export const STORAGE_KEY = 'coffee-grader'

let initialState = {}

if (localStorage.getItem(STORAGE_KEY)) {
  initialState = JSON.parse(localStorage.getItem(STORAGE_KEY))
}
else {
  initialState = {
    user: {
      name: null,
      id: null
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
  updateAuth (state, auth) {
    let newAuthHeaders = {
      accessToken: auth.headers.accessToken,
      tokenType: auth.headers.tokenType,
      client: auth.headers.client,
      expiry: auth.headers.expiry,
      uid: auth.headers.uid
    }
    if (!state.auth.isLoggedIn) { state.auth.isLoggedIn = true }
    state.auth.headers = newAuthHeaders
  }
}

export default {
  state: initialState,
  mutations
}
