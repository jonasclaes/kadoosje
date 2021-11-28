<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
    <div class="bg-gray-200 min-h-screen w-full">
      <div class="bg-gray-800 shadow-lg">
        <div class="max-w-6xl mx-auto px-4">
          <div class="flex justify-between">
            <div class="flex space-x-4">
              <div>
                <a href="/" class="flex items-center h-full px-2">
                  <img src="./assets/kadoosje.svg" alt="Logo" class="h-10 mr-2">
                  <span class="font-semibold text-white text-lg">Kadoosje</span>
                </a>
              </div>
              <div class="flex items-center space-x-1">
                <router-link
                    to="/"
                    class="py-4 px-2 text-white font-semibold hover:text-gray-400 transition duration-300"
                    :class="$route.name === 'Home' ? 'border-b-4 border-red-400 text-red-400 hover:text-red-600' : ''">Home</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container mx-auto px-6 py-3 max-w-6xl">
        <router-view />
      </div>
    </div>
</template>
