<template>
    <Menu/>
</template>
<script>
import Menu from '@/components/Menu.vue'

export default {
  name: 'MenuPage',
  components: {
    Menu
  },
  mounted() {
    this.$store.dispatch('fetchCategories');
    this.$store.dispatch('fetchDishes');
  }
}
</script>