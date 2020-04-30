<template>
  <div class="row" style="min-height:70vh">
    <div class="mx-auto align-self-center text-center" style="max-width:300px">
      <h1>Login</h1><hr />
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" />
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary mx-auto d-block">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { Users } from "../services"

export default {
  data() {
    return {
      disable: false,
      clicked: false,
      cards: new Array(),
      card: {
        header: "Header",
        title: "Card title",
        text: "When you are done editing this card, press enter to save..."
      }
    };
  },

  async mounted() {
    try {
      this.cards = await _cards.Get();
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    async saveCard() {
      try {
        this.disable = true;
        await _cards.Set(this.card);
        this.disable = false;
        this.closeCard();
      } catch (error) {
        console.log(error);
        this.disable = false;
      }
    },

    closeCard() {
      this.clicked = false;
      this.card = new Object();
      this.card.header = "Header";
      this.card.title = "Card title";
      this.card.text =
        "When you are done editing this card, press enter to save...";
    }
  }
}
</script>
