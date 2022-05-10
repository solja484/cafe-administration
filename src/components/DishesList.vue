<template>
  <div>
    <p v-for="d in dishes" :key="d.id">{{d.name}}<span class="dish-price">₴{{d.price}}.00</span></p>
  </div>
</template>

<script>
export default {
  name: "dishesList",
  props: ["category"],
  computed: {
    dishes: function () {
      return this.$store.getters['dishes'].filter(d => d.categoryId === this.$props.category);
    },
    loading: function () {
      return this.$store.getters['loading']
    }
  }
}
</script>

<style scoped>
.dish-price{
  float:right!important;
  font-weight: bold;
}
</style>