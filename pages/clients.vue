<template>
    <v-app>
      <div class="background-wrapper">
        <NavigationBar />
        <v-main>
          <v-container fluid class="mt-5 pa-0">
            <v-row class="mb-4 px-2">
              <v-col cols="12" md="6" class="text-left">
                <h2 class="clients-title">Clients</h2>
              </v-col>
            </v-row>
            <v-row class="mb-4 align-center px-2">
              <v-col cols="12" md="5">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" class="text-right">
                <v-select
                  v-model="selectedTitle"
                  :items="titles"
                  label="Filter by Title"
                  single-line
                  hide-details
                  class="mr-4"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="12" md="3" class="text-right">
                <v-select
                  v-model="selectedNationality"
                  :items="nationalities"
                  label="Filter by Nationality"
                  single-line
                  hide-details
                  class="mr-4"
                  clearable
                ></v-select>
              </v-col>
            </v-row>
            <v-row v-if="filteredClients.length" class="px-2">
              <v-col
                v-for="client in filteredClients"
                :key="client.name"
                cols="12"
                md="4"
                class="mb-4"
              >
                <v-card @click="goToClientDetail(client.name)" class="client-card">
                  <v-img :src="client.avatar" height="100px"></v-img>
                  <v-card-title class="client-name" v-html="client.name"></v-card-title>
                  <v-card-subtitle>{{ client.title }}</v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-else class="px-2">
              <v-col cols="12" class="text-center">
                <v-alert type="error" v-if="error">{{ error }}</v-alert>
                <v-alert type="info" v-else>No clients found</v-alert>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </div>
    </v-app>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useNuxtApp } from '#app'
  import NavigationBar from '~/components/NavigationBar.vue'
  
  interface Client {
    name: string;
    title: string;
    avatar: string;
    quote?: string;
    nationality?: string;
  }
  
  const clients = ref<Client[]>([])
  const search = ref<string>('')
  const selectedTitle = ref<string | null>(null)
  const selectedNationality = ref<string | null>(null)
  const error = ref<string | null>(null)
  const { $axios } = useNuxtApp()
  const router = useRouter()
  
  const fetchClients = async () => {
    try {
      const response = await $axios.get('/api/clients')
      clients.value = response.data
    } catch (err) {
      console.error('Error fetching clients:', err)
      error.value = 'Failed to load clients.'
    }
  }
  
  const goToClientDetail = (clientId: string) => {
    const encodedClientId = encodeURIComponent(clientId)
    router.push({ name: 'clients-id', params: { id: encodedClientId } })
      .then(() => {
        console.log('Navigation complete.')
      })
      .catch((err) => {
        console.error('Navigation error:', err)
      })
  }
  
  const filteredClients = computed(() => {
    let filtered = clients.value
  
    if (selectedTitle.value) {
      filtered = filtered.filter(client => client.title === selectedTitle.value)
    }
  
    if (selectedNationality.value) {
      filtered = filtered.filter(client => client.nationality === selectedNationality.value)
    }
  
    const searchTerm = search.value.toLowerCase()
    filtered = filtered.filter(client => {
      return (
        client.name.toLowerCase().includes(searchTerm) ||
        client.title.toLowerCase().includes(searchTerm) ||
        (client.quote && client.quote.toLowerCase().includes(searchTerm)) ||
        (client.nationality && client.nationality.toLowerCase().includes(searchTerm))
      )
    })
  
    return filtered
  })
  
  const titles = computed(() => {
    return [...new Set(clients.value.map(client => client.title))]
  })
  
  const nationalities = computed(() => {
  return [...new Set(clients.value.map(client => client.nationality).filter(nationality => nationality))]
})

  onMounted(fetchClients)
  </script>
  
  <style scoped>
  body {
    font-family: Roboto, sans-serif;
    margin: 0;
    padding: 0;
  }
  
  .background-wrapper {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .mt-5 {
    margin-top: 5rem;
  }
  
  .mb-4 {
    margin-bottom: 1.5rem;
  }
  
  .client-card {
    cursor: pointer;
  }
  
  .clients-title {
    font-size: 2rem;
    font-weight: bold;
    color: #040b21;
  }
  
  .text-right {
    text-align: right;
  }
  
  .px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  </style>
  