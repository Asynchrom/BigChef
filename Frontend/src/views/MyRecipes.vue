<template>
  <div class="row" style="min-height:90vh">
    <div class="mx-auto" style="min-width:70%; margin-top:5%">
        <h1>My Recipes</h1>
        <div class="list-group">
            <router-link class="list-group-item list-group-item-primary list-group-item-action" to="/myrecipes/new/">+ New Recipe</router-link>
            <MyRecipeCard v-for="recipe in recipes" v-bind:key="recipe._id" v-bind:recipe="recipe" />
        </div>
    </div>
  </div>
</template>

<script>
import MyRecipeCard from "../components/MyRecipeCard"
import { Dishes } from "../services"

export default {
  components: { MyRecipeCard },

  data() {
    return {
      recipes: new Array(),
      error: ""
    }
  },

  async mounted() {
    try {
      this.recipes = await Dishes.get()
    } catch(error) {
      this.error = error
    }
  },
}
</script>
