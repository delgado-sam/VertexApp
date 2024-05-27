<template>
  <v-app>
    <NavigationBar />
    <v-app-bar app dark class="custom-sub-bar">
      <v-row class="align-center">
        <v-col cols="12" md="6" class="text-left">
          <v-btn icon @click="goBack">
            <v-icon color="white">mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn text @click="goBack" class="button-client" color="white" :class="{ active: isActive('/clients') }">Clients </v-btn>
          <v-btn text @click="goBack" class="button-client" color="white" :class="{ active: isActiveClientDetails() }">&gt;&nbsp;&nbsp;&nbsp;&nbsp;Client Details</v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <v-container fluid class="mt-5 pa-10">
        <v-row class="mb-4">
          <v-col cols="12" md="6" class="text-left">
            <h2 class="client-details-title">Details</h2>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card v-if="client" class="d-flex align-start large-card">
              <v-col cols="12" md="6" class="d-flex flex-column align-items-center">
                <v-img :src="client.avatar" height="128x" width="128x" class="avatar"></v-img>
                <v-card-title class="client-name" v-html="client.name"></v-card-title>
              </v-col>
              <v-card-text class="client-info">
                <p><strong>Title:</strong> {{ client.title }}</p>
                <p v-if="client.quote"><strong>Quote:</strong> {{ client.quote }}</p>
                <p v-if="client.nationality"><strong>Nationality:</strong> {{ client.nationality }}</p>
              </v-card-text>
            </v-card>
            <v-alert v-else type="error">Client not found</v-alert>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNuxtApp } from '#app'
import NavigationBar from '~/components/NavigationBar.vue'

interface Client {
  name: string;
  title: string;
  avatar: string;
  quote?: string;
  nationality?: string;
}

const client = ref<Client | null>(null)
const route = useRoute()
const router = useRouter()
const { $axios } = useNuxtApp()

const fetchClient = async () => {
  const { id } = route.params
  const decodedId = decodeURIComponent(id as string)
  console.log('Route parameter (id):', id)
  console.log('Decoded parameter:', decodedId)
  try {
    const response = await $axios.get('/api/clients')
    console.log('API response data:', response.data)
    const clients = response.data as Client[]
    client.value = clients.find(c => c.name === decodedId) || null
    console.log('Matched client:', client.value)
  } catch (error) {
    console.error('Error fetching client:', error)
  }
}

const goBack = () => {
  router.push('/clients')
}

const isActive = (path: string) => {
  return route.path === path
}

const isActiveClientDetails = () => {
  return route.path.startsWith('/clients/') && route.params.id
}

onMounted(fetchClient)

watch(route, fetchClient)
</script>

<style scoped>
.v-card {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  min-height: 100px;
  min-width: 200px;
}

.large-card {
  min-height: 200px;
  padding: 24px;
}

.v-card-title {
  font-size: 1.5rem;
}

.client-name {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

.v-img.avatar {
  border-radius: 50%;
}

.v-card-text {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 24px;
  padding-top: 24px; /* Add padding-top to lower the info */
}

.v-card-text p {
  margin-bottom: 16px; /* Add space between each piece of information */
}

.v-btn v-icon {
  color: white;
}

.clients-title {
  font-size: 1rem;
  font-weight: normal;
  color: #040b21;
}

.text-right {
  text-align: right;
}

.custom-sub-bar {
  box-shadow: none;
  background: url('nav.png') no-repeat center center fixed;
  background-size: cover;
}

.button-client {
  color: 040b21;
  text-transform: none;
}

.button-client.active {
  background-color: rgba(25, 211, 189, 0.2); /* Highlight active tab */
}

.client-details-title {
  font-size: 2rem;
  font-weight: bold;
  color: #040b21;
}
</style>
