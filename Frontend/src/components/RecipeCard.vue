<template>
  <router-link v-bind:to="{ name: 'Dish', params: {name: recipe.name, recipe: recipe}}" class="text-dark">
    <div class="card float-left m-2">
      <img v-bind:src="recipe.img" class="card-img-top" style="width: 300px; height: 250px" />
      <i v-if="store.credentials.bookmarks.includes(recipe._id)" class="fas fa-bookmark m-auto text-primary fa-4x position-absolute" style="left: 10px  "></i>
      <div class="card-body" style="width: 300px; height: 150px">
        <h5 class="card-title d-inline">{{recipe.name}}</h5> <span class="float-right">{{recipe.time}} min</span>
        <p class="card-text">{{description}}</p>
      </div>
      <div class="card-footer"  style="width: 300px; height: 50px">
        <small class="text-muted">By {{recipe.by}}</small>
      </div>
    </div>
  </router-link>
</template>

<script>
import { Dishes } from "../services"
import store from "../store"

export default {
    props: ["recipe"],

    data() {
        return {
            store,
            error: "",
            description: ""
        }
    },

    mounted() {
      this.description = this.recipe.description.slice(0,100) + ".."
    }
}
</script>
