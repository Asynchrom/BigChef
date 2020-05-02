<template>
  <router-link v-bind:to="{ name: 'Dish', params: {name: recipe.name, recipe: recipe}}" class="text-dark">
    <div class="card float-left m-2" style="max-width: 300px">
      <img v-bind:src="recipe.img" class="card-img-top" style="height: 250px" />
      <div class="card-body">
        <h5 class="card-title d-inline">{{recipe.name}}</h5> <span class="float-right">{{recipe.time}} min</span>
        <p class="card-text">{{description}}</p>
      </div>
      <div class="card-footer">
        <small class="text-muted">By {{recipe.by}}</small>
      </div>
    </div>
  </router-link>
</template>

<script>
import { Dishes } from "../services"

export default {
    props: ["recipe"],

    data() {
        return {
            error: "",
            description: ""
        }
    },

    mounted() {
      this.description = this.recipe.description.slice(0,100) + ".."
    }
}
</script>
