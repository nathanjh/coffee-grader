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

export default {
  state: initialState
}
