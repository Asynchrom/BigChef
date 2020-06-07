<template>
  <div class="row" style="min-height:90vh">
    <div class="mx-auto align-self-center text-center">
      <h1 class="text-primary mb-3" style="font-family:'Merienda One'; width:100%">Chef's daily choice</h1>
      <img class="float-left" src="../assets/chief.png" height="450" width="450"> 
      <RecipeCard v-for="recipe in recipes" v-bind:key="recipe._id" v-bind:recipe="recipe"/>
    </div>
  </div>
</template>

<script>
import RecipeCard from "../components/RecipeCard.vue"
import { Daily } from "../services"

export default {
  components: { RecipeCard },
  
  data() {
    return {
      recipes: new Array(),
      error: ""
    }
  },

  async mounted() {
    try {
        this.recipes = await Daily.get()
    } catch(error) {
        this.error = error.response.data
    }
  }
}
</script>
