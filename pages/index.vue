<template>
    <v-app>
      <div class="background-wrapper">
        <NavigationBar />
        <v-main>
          <div class="welcome-page">
            <v-container>
              <v-row class="align-center">
                <v-col cols="12" md="6" class="text-left">
                  <h1 class="welcome-title">Vertex</h1>
                  <p class="welcome-subtitle">
                    Empowering our clients with innovative technology solutions tailored to their needs.
                  </p>
                  <v-btn @click="goToClients" class="learn-more-button">View Clients</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-main>
      </div>
    </v-app>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  import NavigationBar from '~/components/NavigationBar.vue'
  
  const router = useRouter()
  
  const goToClients = () => {
    router.push('/clients')
  }
  </script>
  
  <style scoped>
  body {
    font-family: Roboto, sans-serif;
    margin: 0;
    padding: 0;
  }
  
  .background-wrapper {
    background: url('landingPage.jpg') no-repeat center center fixed;
    background-size: cover;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .welcome-page {
    color: white;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .text-left {
    text-align: left;
  }
  
  .welcome-title {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .welcome-subtitle {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }
  
  .learn-more-button {
    background-color: #19d3bd;
    color: white;
  }
  </style>
  