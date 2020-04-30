<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <router-link class="navbar-brand text-white ml-3" to="/">BigChief</router-link>
    <button
      class="navbar-toggler"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul v-if="store.authenticated" class="navbar-nav ml-auto mr-5">
        <li class="nav-item">
          <a class="nav-link" href="#">Recipes</a>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/notes">Notes</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Bookmarks</a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            data-toggle="dropdown"
          >Profile</a>
          <div class="dropdown-menu">
            <a class="dropdown-item">{{store.credentials.username}}</a>
            <div class="dropdown-divider"></div>
            <router-link class="nav-link ml-3" to="/account">Account</router-link>
            <a class="dropdown-item" href="#">My Recipes</a>
            <div class="dropdown-divider"></div>
            <a v-on:click="logOut()" class="dropdown-item" href="/">Log Out</a>
          </div>
        </li>
      </ul>
      <ul v-else class="navbar-nav ml-auto mr-5">
        <li class="nav-item">
          <router-link class="nav-link ml-3" to="/login">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link ml-3" to="/signup">Signup</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import store from "../store";

export default {
  data() {
    return {
      store
    };
  },

  methods: {
    logOut() {
       window.sessionStorage.clear()
    }
  }
};
</script>
