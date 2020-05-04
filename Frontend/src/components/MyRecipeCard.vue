<template>
  <router-link v-bind:to="{ name: 'Dish', params: {name: recipe.name, recipe: recipe}}" 
    class="list-group-item list-group-item-action">{{recipe.name}} ({{recipe.type}})
    <button v-if="!disable" v-on:click="deleteRecipe($event)"  title="Delete" 
    class="btn btn-danger float-right p-0 text-white" style="width: 30px;"><i class="fas fa-trash"></i></button>
    <div v-if="disable" class="spinner-border spinner-border-sm float-right mt-1 mr-1" role="status"></div>
  </router-link>
</template>

<script>
import { Recipes } from "../services"

export default {
    props: ["recipe"],

    data() {
        return {
            disable: false,
            error: ""
        }
    },

    methods: {
        async deleteRecipe(event) {
            event.preventDefault()
            try {
                this.disable = true
                await Recipes.delete(this.recipe._id)
            } catch (error) {
                this.error = error
                this.disable = false
            }
        }
    }
}
</script>
