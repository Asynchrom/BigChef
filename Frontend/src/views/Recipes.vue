<template>
  <div class="row" style="min-height:90vh">
      <button class="btn btn-primary rounded-circle shadow-none position-absolute"  style="margin-left: 50vw; height: 60px; width: 60px; z-index: 1; top: 20px"
        type="button" data-toggle="collapse" data-target="#collapseExample">
        <i class="fas fa-angle-double-down"></i>
      </button>
      <div class="collapse vw-100" id="collapseExample">
        <div class="card card-body bg-light border-0">
            <input v-model="search" class="form-control mx-auto" type="search" placeholder="Search" style="width: 75%">
        </div>
      </div>
      <div v-if="loading" class="spinner-border text-primary mx-auto" role="status" style="width: 100px; height: 100px; margin-top: 35vh">
        <span class="sr-only">Loading...</span>
      </div>
      <div  v-else class="container-fluid">
        <RecipeCard v-for="recipe in recipes" v-bind:key="recipe._id" v-bind:recipe="recipe"/>
      </div>
  </div>
</template>

<script>
import _ from 'lodash';
import RecipeCard from "../components/RecipeCard.vue"
import { Recipes } from "../services"

export default {
  components: { RecipeCard },

  data() {
    return {
      recipes: new Array(),
      search: new String,
      loading: true,
      error: ""
    }
  },

  watch: {
    search: _.debounce(function(value) {
        this.getRecipes(value);
    }, 500)
  },

  async mounted() {
    try {
      this.recipes = await Recipes.get()
      this.loading = false
    } catch(error) {
      this.error = error
    }
  },

   methods: {
    async getRecipes(value) {
      try {
          this.recipes = await Recipes.get(value)
      } catch (error) {
          this.error = error.response.data
      }
    }
  }
}
</script>
