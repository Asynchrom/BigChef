<template>
  <div class="card text-white bg-info m-3 float-left" style="width: 18rem; height: 14rem;">
    <div class="card-header">
      <span
        v-on:keydown.enter="updateCard()"
        v-on:input="card.header = $event.target.innerText"
        v-bind:contenteditable="!disable"
      >{{card.header}}</span>
      <div v-if="disable" class="spinner-border spinner-border-sm float-right mt-1" role="status"></div>
      <button v-else v-on:click="deleteCard()" type="button" class="close text-white">&times;</button>
    </div>
    <div class="card-body">
      <h5
        v-on:keydown.enter="updateCard()"
        v-on:input="card.title = $event.target.innerText"
        v-bind:contenteditable="!disable"
        class="card-title"
      >{{card.title}}</h5>
      <p
        v-on:keydown.enter="updateCard()"
        v-on:input="card.text = $event.target.innerText"
        v-bind:contenteditable="!disable"
        class="card-text" 
      >{{card.text}}</p>
    </div>
  </div>
</template>

<script>
import { _cards } from "@/services";

export default {
  props: ["card"],

  data() {
    return {
      disable: false
    };
  },

  methods: {
    async deleteCard() {
      try {
        this.disable = true;
        await _cards.Pop(this.card._id);
        this.disable = false;
      } catch (error) {
        console.log(error);
        this.disable = false;
      }
    },

    async updateCard() {
      try {
        this.disable = true;
        await _cards.Update(this.card);
        this.disable = false;
      } catch (error) {
        console.log(error);
        this.disable = false;
      }
    }
  }
};
</script>
