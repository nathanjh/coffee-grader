import { STORAGE_KEY } from './modules/auth'

const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    const syncedData = { user: state.user, auth: state.auth }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(syncedData))
  })
}

export default [localStoragePlugin]
