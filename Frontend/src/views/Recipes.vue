<template>
  <div class="row" style="min-height:90vh">
      <div v-if="loading" class="spinner-border text-primary mx-auto" role="status" style="width: 100px; height: 100px; margin-top: 35vh">
        <span class="sr-only">Loading...</span>
      </div>
      <RecipeCard v-else v-for="recipe in recipes" v-bind:key="recipe._id" v-bind:recipe="recipe"/>
  </div>
</template>

<script>
import RecipeCard from "../components/RecipeCard.vue"
import { Dishes } from "../services"

export default {
  components: { RecipeCard },

  data() {
    return {
      loading: true,
      recipes: new Array(),
      error: ""
    }
  },

  async mounted() {
    try {
      this.recipes = await Dishes.getAll()
      this.loading = false
    } catch(error) {
      this.error = error
    }
  },
}
</script>
