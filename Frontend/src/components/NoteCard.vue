<template>
  <div class="card text-white bg-primary m-3 float-left" style="width: 18rem; height: 14rem;">
    <div class="card-header">
      <span>{{note.header}}</span>
      <div v-if="disable" class="spinner-border spinner-border-sm float-right mt-1" role="status"></div>
      <button v-else v-on:click="deleteNote()" type="button" class="close text-white">&times;</button>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{note.title}}</h5>
      <p class="card-text" >{{note.text}}</p>
    </div>
  </div>
</template>

<script>
import { Notes } from "../services"

export default {
  props: ["note"],

  data() {
    return {
      disable: false,
      error: ""
    }
  },

  methods: {
    async deleteNote() {
      try {
          this.disable = true
          await Notes.delete(this.note._id)
      } catch (error) {
          this.error = error
          this.disable = false
      }
    }
  }
}
</script>
