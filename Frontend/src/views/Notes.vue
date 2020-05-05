<template>
  <div class="container-fluid">
    <div v-if="!clicked" v-on:click="clicked = true"
      class="card btn text-secondary bg-transparent m-3 float-left" style="width: 18em; height: 14em">
      <i class="far fa-plus-square m-auto fa-3x"></i>
    </div>
    <div v-else class="card m-3 float-left" style="width: 18rem; height: 14rem;">
      <div class="card-header">
        <span v-on:keydown.enter="saveNote()" v-on:input="card.header = $event.target.innerText"
          v-bind:contenteditable="!disable">{{card.header}}</span>
        <div v-if="disable" class="spinner-border spinner-border-sm float-right mt-1" role="status"></div>
        <button v-else v-on:click="closeCard()" type="button" class="close ">&times;</button>
      </div>
      <div class="card-body">
        <h5 v-on:keydown.enter="saveNote()" v-on:input="card.title = $event.target.innerText"
          v-bind:contenteditable="!disable" class="card-title">{{card.title}}</h5>
        <p
          v-on:keydown.enter="saveNote()" v-on:input="card.text = $event.target.innerText"
          v-bind:contenteditable="!disable" class="card-text">{{card.text}}</p>
      </div>
    </div>
    <NoteCard v-for="note in notes" v-bind:key="note._id" v-bind:note="note" />
  </div>
</template>

<script>
import NoteCard from "../components/NoteCard"
import { Notes } from "../services"

export default {
  components: { NoteCard },

  data() {
    return {
      disable: false,
      clicked: false,
      notes: new Array(),
      error: "",
      card: {
        header: "Food",
        title: "Note title",
        text: "When you are done editing the note, press enter to save..."
      }
    }
  },

  async mounted() {
    try {
        this.notes = await Notes.get()
    } catch(error) {
        this.error = error
    }
  },

  methods: {
    async saveNote() {
      try {
          this.disable = true
          await Notes.set(this.card)
          this.closeCard()
      } catch (error) {
          this.error = error
      } finally {
          this.disable = false
      }
    },

    closeCard() {
      this.clicked = false
      this.card = new Object()
      this.card.header = "Food"
      this.card.title = "Note title"
      this.card.text = "When you are done editing the note, press enter to save..."
    }
  }
}
</script>
