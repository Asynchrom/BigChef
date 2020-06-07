<template>
  <div class="row" style="min-height:90vh">
      <div v-if="empty" class="text-center" style="margin-top: 35vh; width:100%">
        <h2 class="text-primary">You have not bookmarked any dish!</h2>
      </div>
      <div v-else-if="loading" class="spinner-border text-primary mx-auto" role="status" style="width: 100px; height: 100px; margin-top: 35vh">
        <span class="sr-only">Loading...</span>
      </div>
      <div  v-else class="container-fluid">
        <RecipeCard v-for="recipe in recipes" v-bind:key="recipe._id" v-bind:recipe="recipe"/>
      </div>
  </div>
</template>

<script>
import RecipeCard from "../components/RecipeCard.vue"
import { Bookmarks } from "../services"

export default {
  components: { RecipeCard },

  data() {
    return {
      recipes: new Array(),
      loading: true,
      empty: false,
      error: ""
    }
  },

  async mounted() {
    try {
        this.recipes = await Bookmarks.get()
        this.loading = false
    } catch(error) {
        if(error.response.status == 460) this.empty = true
        this.error = error.response.data
    }
  },

  watch: {
    recipes: function () {
      if(this.recipes.length == 0) this.empty = true
    }
  }
}
</script>
