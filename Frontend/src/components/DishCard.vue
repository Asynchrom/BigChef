<template>
  <div class="col-7 container-fluid">
    <div class="float-left m-2" style="width:350px; height:350px">
        <img v-bind:src="recipe.img" class="card-img-top" style="height: 300px" />
    </div>
    <button v-bind:disabled="disabled" v-if="bookmarked" v-on:click="changeBookmark()" class="btn text-success m-3 float-left shadow-none">
      <i class="fas fa-bookmark m-auto fa-4x"></i>
    </button>
    <button v-bind:disabled="disabled" v-else v-on:click="changeBookmark()" class="btn text-primary bg-transparent m-3 float-left shadow-none">
      <i class="far fa-bookmark m-auto fa-4x"></i>
    </button>
    <div class="float-left m-2" style="max-width:300px;">
        <div class="card-body">
            <h5 class="card-title">{{recipe.name}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">By {{recipe.by}}</h6> 
        </div>
    </div>
    <div class="float-left m-2" style="max-width:300px;">
        <div class="card-body">
            <h5 class="card-title">Type</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{recipe.type}}</h6> 
        </div>
    </div>
    <div class="float-left m-2" style="max-width:300px;">
        <div class="card-body">
            <h5 class="card-title">Time</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{recipe.time}} min</h6> 
        </div>
    </div>
    <div class="float-left m-2" style="max-width:300px;">
        <div class="card-body">
            <h5 class="card-title">Ingredients</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{recipe.ingredients}}</h6> 
        </div>
    </div>
    <div class="float-left m-2">
        <div class="card-body">
            <h5 class="card-title">Description</h5>
            <h6 class="card-subtitle mb-2 text-muted" style="white-space: pre-wrap;">{{recipe.description}}</h6>
        </div>
    </div>
  </div>
</template>

<script>
import { Bookmarks } from "../services"
import store from "../store"

export default {
    props: ["recipe"],

    data() {
        return {
            error: "",
            disabled: false,
            bookmarked: false
        }
    },

    mounted() {
        if (store.credentials.bookmarks.includes(this.recipe._id)) this.bookmarked = true
    },

    methods: {
      async changeBookmark() {
        try {
            this.disabled = true
            if (this.bookmarked) await Bookmarks.delete(this.recipe)
            else await Bookmarks.set(this.recipe)
            this.bookmarked = !this.bookmarked
        } catch (error) {
            this.error = error
        } finally {
            this.disabled = false
        }
      }
    }
}
</script>
