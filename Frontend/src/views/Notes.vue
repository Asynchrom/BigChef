<template>
  <div class="container-fluid">
    <div v-if="!clicked" v-on:click="clicked = true"
      class="card btn border-secondary text-secondary bg-transparent m-3 float-left" style="width: 18em; height: 14em">
      <i class="far fa-plus-square m-auto fa-3x"></i>
    </div>
    <div v-else class="card text-white bg-secondary m-3 float-left" style="width: 18rem; height: 14rem;">
      <div class="card-header">
        <span v-on:keydown.enter="saveCard()" v-on:input="card.header = $event.target.innerText"
          v-bind:contenteditable="!disable">{{card.header}}</span>
        <div v-if="disable" class="spinner-border spinner-border-sm float-right mt-1" role="status"></div>
        <button v-else v-on:click="closeCard()" type="button" class="close text-white">&times;</button>
      </div>
      <div class="card-body">
        <h5 v-on:keydown.enter="saveCard()" v-on:input="card.title = $event.target.innerText"
          v-bind:contenteditable="!disable" class="card-title">{{card.title}}</h5>
        <p
          v-on:keydown.enter="saveCard()" v-on:input="card.text = $event.target.innerText"
          v-bind:contenteditable="!disable" class="card-text">{{card.text}}</p>
      </div>
    </div>
    <TaskCard v-for="card in cards" v-bind:key="card._id" v-bind:card="card" />
  </div>
</template>

<script>
import TaskCard from "../components/TaskCard"
import { Notes } from "../services"

export default {
  components: { TaskCard },

  data() {
    return {
      disable: false,
      clicked: false,
      cards: new Array(),
      error: "",
      card: {
        header: "Header",
        title: "Card title",
        text: "When you are done editing the card, press enter to save..."
      }
    }
  },

  async mounted() {
    try {
      this.cards = await Notes.Get()
    } catch(error) {
      console.log(error)
      this.error = error
    }
  },

  methods: {
    async saveCard() {
      try {
        this.disable = true
        await Notes.Set(this.card)
        this.closeCard()
        this.disable = false
      } catch (error) {
        console.log(error)
        this.error = error
        this.disable = false
      }
    },

    closeCard() {
      this.clicked = false
      this.card = new Object()
      this.card.header = "Header"
      this.card.title = "Card title"
      this.card.text = "When you are done editing the card, press enter to save..."
    }
  }
}
</script>
