<template>
  <div class="row" style="min-height:70vh">
    <div class="mx-auto align-self-center text-center" style="max-width:300px">
      <h1>Signup</h1><hr />
      <span v-if="error" class="text-danger">{{ error }}<hr /></span>
      <div class="form-group">
        <label>Username</label>
        <input v-bind:disabled="disable" v-model="store.credentials.username" v-on:keydown.enter="userSignup()" type="username" class="form-control" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-bind:disabled="disable" v-model="store.credentials.password" v-on:keydown.enter="userSignup()" type="password" class="form-control" />
      </div>
      <div class="form-group">
        <label>Confirm password</label>
        <input v-bind:disabled="disable" v-model="password" v-on:keydown.enter="userSignup()" type="password" class="form-control" />
      </div>
      <div class="form-check-inline">
        <input v-model="store.credentials.gender" class="form-check-input" type="radio" value="Male" id="male" />
        <label class="form-check-label" for="male">Male</label>
      </div>
      <div class="form-check-inline">
        <input v-model="store.credentials.gender" class="form-check-input" type="radio" value="Female" id="female" />
        <label class="form-check-label" for="female">Female</label>
      </div>
      <button v-bind:disabled="disable" v-on:click="userSignup()" class="btn btn-primary mx-auto d-block mt-4">Submit</button>
    </div>
  </div>
</template>

<script>
import { Users } from "../services"
import store from "../store"

export default {
  data() {
    return {
      store,
      password: new String,
      disable: false,
      error: ""
    }
  },

  methods: {
    async userSignup() {
      try {
          if (this.store.credentials.password != this.password)
            return this.error = "Passwords doesn't match!"
          await Users.signup()
          this.$router.replace({ name: "Home" })
      } catch (error) {
          this.error = error.response.data
      } finally {
          this.disable = false
      }
    }
  }
}
</script>
