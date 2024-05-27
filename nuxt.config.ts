import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'path'; 
import { createCommonJS } from 'mlly';
const { __dirname } = createCommonJS(import.meta.url); 

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    'vuetify/styles',
  ],
  build: {
    transpile: ['vuetify'],
  },
  plugins: ['~/plugins/vuetify.ts', '~/plugins/axios.ts'],
  nitro: {
    preset: 'node-server',
  },
  hooks: {
    'pages:extend'(pages) {
      pages.push({
        name: 'clients-id',
        path: '/clients/:id',
        file: resolve(__dirname, 'pages/clients/[id].vue'),
      })
    },
  },
})