<template>
  <div style="min-height:90vh">
    <div class="row">
        <DishCard v-bind:recipe="recipe" />
        <div class="col-5">Comments</div>
    </div>
  </div>
</template>

<script>
import DishCard from "../components/DishCard"

export default {
  components: { DishCard },
  props: ["recipe"],

  data() {
    return {
      error: "",
      description: ""
    };
  },
};
</script>
