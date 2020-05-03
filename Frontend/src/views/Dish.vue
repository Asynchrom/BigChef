<template>
  <div style="min-height:90vh">
    <div class="row">
        <DishCard v-bind:recipe="recipe" />
        <Comments v-bind:recipe="recipe" />
    </div>
  </div>
</template>

<script>
import DishCard from "../components/DishCard"
import Comments from "../components/Comments"

export default {
  components: { DishCard, Comments },
  props: ["recipe"],
}
</script>
