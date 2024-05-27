<template>
  <v-app-bar app dark class="custom-app-bar">
    <v-btn icon @click="goToHome">
      <img src="/triangleLogo.png" alt="Home" class="home-icon" />
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn text @click="goToAboutUs" class="button-client" :class="{ active: isActive('/about') }">About Us</v-btn>
    <v-btn v-if="!isClientDetailsPage" text @click="goToClients" class="button-client" :class="{ active: isActive('/clients') }">Clients</v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()

const goToHome = () => {
  router.push('/')
}

const goToAboutUs = () => {
  router.push('/about')
}

const goToClients = () => {
  router.push('/clients')
}

const isActive = (path: string) => {
  return route.path === path
}

const isClientDetailsPage = computed(() => {
  return route.path.startsWith('/clients/') && route.params.id
})
</script>


<style scoped>
.custom-app-bar {
  box-shadow: none;
  background: url('nav.png') no-repeat center center fixed;
  background-size: cover;
}

.home-icon {
  width: 24px;
  height: 24px;
}

.button-client {
  color: white;
  text-transform: none;
}

.button-client.active {
  background-color: rgba(25, 211, 189, 0.2); /* Highlight active tab */
}
</style>
