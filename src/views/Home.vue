<template>
  <div>
    <h1 class="font-bold text-3xl">Welkom bij Kadoosje!</h1>
    <em>De verlanglijstjes website van de 21ste eeuw!</em>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
      <div class="bg-white p-3 rounded-xl shadow-lg">
        <h2 class="font-semibold text-xl">Waarom Kadoosje?</h2>
        <p>
          Kadoosje is gebouwd met de nieuwste en snelste technologie waardoor
          wij jou een geweldige ervaring kunnen aanbieden! Daarnaast kan
          iedereen onze site verbeteren, en wordt onze site dus alleen maar
          beter!
        </p>
        <strong>Probeer het een keer, het is volledig gratis!</strong>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Home extends Vue {}
</script>
