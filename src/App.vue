<template>
  <div class="min-h-screen h-full w-full flex flex-col">
    <div class="bg-blue-600 text-white">
      <div class="container mx-auto">
        <div class="max-w-6xl mx-auto flex justify-between p-4">
          <div>
            <img src="./assets/kadoosje.svg" alt="Logo" />
            <span>Kadoosje</span>
          </div>
          <div class="flex space-x-3">
            <router-link
              v-for="link in navbarLinks"
              :key="link.name"
              :to="link.route"
              :class="{ 'font-semibold': $route.name === link.name }"
              >{{ link.name }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-gray-100 text-gray-800 min-h-screen h-full w-full absolute top-0 pt-14"
    >
      <div class="container mx-auto">
        <div class="max-w-6xl mx-auto p-4">
          <!-- <router-view /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class App extends Vue {
  navbarLinks = [
    {
      name: "Home",
      route: "/",
    },
  ];
}
</script>
