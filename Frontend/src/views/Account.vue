<template>
  <div class="row" style="min-height:70vh">
    <div class="mx-auto align-self-center text-center" style="max-width:300px">
      <h1>Account</h1><hr />
      <span v-if="error" class="text-danger">{{ error }}<hr /></span>
      <span v-if="changed" class="text-success">Password changed!<hr /></span>
      <div class="form-group">
        <label>Username</label>
        <input v-model="username" disabled="true" type="username" class="form-control" />
      </div>
      <div class="form-group">
        <label>New password</label>
        <input v-bind:disabled="disable" v-model="passwordCheck" v-on:keydown.enter="change()" type="password" class="form-control" />
      </div>
      <div class="form-group">
        <label>Confirm password</label>
        <input v-bind:disabled="disable" v-model="passwordCheck" v-on:keydown.enter="change()" type="password" class="form-control" />
      </div>
      <button v-bind:disabled="disable" v-on:click="change()" class="btn btn-primary mx-auto d-block">Change</button>
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
      username: store.credentials.username,
      password: "",
      passwordCheck: "",
      error: "",
      changed: false,
      disable: false
    }
  },

  methods: {
    async change() {
      try {
        if(this.password != this.passwordCheck) {
          this.changed = false
          return this.error = "Password doesn't match!"
        }
        this.disable = true
        this.store.credentials.password = this.password
        await Users.change()
        this.error = ""
        this.disable = false
        this.changed = true
      } catch {
          if(error.toString().includes('460')) this.error = "Password too short!"
          else this.error = "Something went wrong!"
          this.disable = false
          this.changed = false
      }
    }
  }
}
</script>
