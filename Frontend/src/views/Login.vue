<template>
  <div class="row" style="min-height:70vh">
    <div class="mx-auto align-self-center text-center" style="max-width:300px">
      <h1>Login</h1><hr />
      <span v-if="error" class="text-danger">{{ error }}<hr /></span>
      <div class="form-group">
        <label>Username</label>
        <input v-bind:disabled="disable" v-model="store.credentials.username" v-on:keydown.enter="login()" type="username" class="form-control" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-bind:disabled="disable" v-model="store.credentials.password" v-on:keydown.enter="login()" type="password" class="form-control" />
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button v-bind:disabled="disable" v-on:click="login()" class="btn btn-primary mx-auto d-block">Submit</button>
    </div>
  </div>
</template>

<script>
import { Users } from "../services";
import store from "../store";

export default {
  data() {
    return {
      store,
      disable: false,
      error: ""
    };
  },

  methods: {
    async login() {
      try {
        this.disable = true
        await Users.login();
        this.$router.replace({ name: "Home" });
      } catch {
        this.error = "Wrong credentials!";
        this.disable = false;
      }
    }
  }
}
</script>
