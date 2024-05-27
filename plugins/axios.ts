import axios from 'axios'

export default defineNuxtPlugin(nuxtApp => {
  const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
  })

  nuxtApp.provide('axios', axiosInstance)
})
