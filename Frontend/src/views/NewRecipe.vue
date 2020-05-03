<template>
  <div class="row" style="min-height:90vh">
    <div style="width:80%; max-width:800px; margin:2.5% auto">
      <div class="row">
        <div class="col-4">
          <h1>New Recipe</h1>
        </div>
        <div class="col-7">
          <button v-bind:disabled="disable" v-on:click="save()" class="btn btn-primary mt-2">Submit</button>
        </div>
      </div>
      <hr />
      <span v-if="error" class="text-danger">{{ error }}<hr /></span>
      <span v-if="changed" class="text-success">Recipe added!<hr /></span>
      <div class="form-group row">
        <div class="col">
          <label>Name:</label>
          <input v-bind:disabled="disable" v-model="recipe.name" class="form-control" placeholder="Pancakes" />
        </div>
        <div class="col-3">
          <div class="form-group">
            <label>Type:</label>
            <select v-bind:disabled="disable" class="form-control" v-model="selected">
                <option v-for="option in options" v-bind:key="option.value" v-bind:value="option.value">{{ option.text }}</option>
            </select>
          </div>
        </div>
        <div class="col-3">
          <label>Time:</label>
          <div class="input-group mb-3">
            <input v-bind:disabled="disable" v-model="recipe.time" type="number" class="form-control text-right" placeholder="10" />
            <div class="input-group-append">
              <span class="input-group-text">min</span>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>Ingredients:</label>
        <textarea v-bind:disabled="disable" v-model="recipe.ingredients" class="form-control" placeholder="Eggs, Milk, Sugar, Baking powder, Flour" rows="1"></textarea>
      </div>
      <div class="form-group">
        <label>Description:</label>
        <textarea v-bind:disabled="disable" v-model="recipe.description" class="form-control" placeholder="Mix all ingredients together and fry them in frying pan." rows="3"></textarea>
      </div>
      <label>Image URL:</label>
      <input v-bind:disabled="disable" v-model="recipe.img" class="form-control" placeholder="https://example.com/pancakes.jpg" />      
    </div>
  </div>
</template>

<script>
import { Dishes } from "../services";

export default {
  data() {
    return {
        changed: false,
        disable: false,
        error: '',
        selected: '',
        options: [
            { text: 'Soup', value: 'Soup' },
            { text: 'Breakfast', value: 'Breakfast' },
            { text: 'Main dish', value: 'Main dish' },
            { text: 'Salad', value: 'Salad' },
            { text: 'Dessert', value: 'Dessert' }
        ],
        recipe: {
            name: new String(),
            type: new String(),
            time: new Number(),
            ingredients: new String(),
            description: new String(),
            img: new String(),
        }
    };
  },

   watch: {
    selected: function (value) {
      this.recipe.type = value
    }
  }, 

  methods: {
    async save() {
      try {
        this.disable = true
        await Dishes.save(this.recipe)
        this.error = ""
        this.disable = false
        this.changed = true
        this.selected = ''
        this.recipe = new Object()
      } catch (error) {
        if (error.toString().includes('460')) this.error = "All fields are required!"
        else this.error = "Something went wrong!"
        this.disable = false
        this.changed = false
      }
    }
  }
}
</script>
