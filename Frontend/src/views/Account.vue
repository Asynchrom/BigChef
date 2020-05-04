<template>
  <div class="row" style="min-height:70vh">
    <div class="mx-auto align-self-center text-center" style="max-width:300px">
      <h1>Account</h1><hr />
      <span v-if="error" class="text-danger">{{ error }}<hr /></span>
      <span v-else-if="changed" class="text-success">Password changed!<hr /></span>
      <div class="form-group">
        <label>Username</label>
        <input v-model="username" disabled="true" type="username" class="form-control" />
      </div>
      <div class="form-group">
        <label>New password</label>
        <input v-bind:disabled="disable" v-model="newPassword" v-on:keydown.enter="change()" type="password" class="form-control" />
      </div>
      <div class="form-group">
        <label>Old password</label>
        <input v-bind:disabled="disable" v-model="oldPassword" v-on:keydown.enter="change()" type="password" class="form-control" />
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
      newPassword: new String,
      oldPassword: new String,
      changed: false,
      disable: false,
      error: ""
    }
  },

  methods: {
    async change() {
      try {
          if (this.oldPassword != this.store.credentials.password)
            return this.error = "Wrong password!"
          this.disable = true
          this.store.credentials.password = this.newPassword
          await Users.change()
          this.error = ""
          this.changed = true
      } catch (error) {
          this.error = "Something went wrong!"
          if (error.toString().includes('460')) this.error = "Password is too short!"
          this.store.credentials.password = this.oldPassword
      } finally {
          this.disable = false
      }
    }
  }
}
</script>
