import { defineStore } from 'pinia'
export const useApplicationStore = defineStore('application', () => {
  const location = window.location.origin + (window.ChatFlow?.chatPrefix || '') + '/'
  return { location }
})
