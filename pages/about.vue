<template>
    <v-app>
      <NavigationBar />
      <v-main>
        <v-container fluid class="mt-5 pa-10">
          <v-row>
            <v-col cols="12" class="text-center">
              <h1 class="about-title">About Us</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="8" class="mx-auto">
              <v-card class="pa-5">
                <v-card-text>
                  <p>
                    Coming Soon
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup lang="ts">
  import NavigationBar from '~/components/NavigationBar.vue'
  </script>
  
  <style scoped>
  .about-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #040b21;
    margin-bottom: 2rem;
  }
  </style>
  