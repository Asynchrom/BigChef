<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <router-link class="navbar-brand text-white ml-3" to="/">Big Chief</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
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
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Profile</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Account</a>
            <a class="dropdown-item" href="#">My Recipes</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Log Out</a>
          </div>
        </li>
      </ul>
      <ul v-else class="navbar-nav ml-auto mr-5">
        <li class="nav-item">
          <a class="nav-link" href="#">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Register</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import store from "../store"

export default {
  data() {
    return {
      store
    }
  }
};
</script>
