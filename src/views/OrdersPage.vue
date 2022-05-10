<template>
  <Orders></Orders>
</template>

<script>
import Orders from '@/components/Orders.vue'

export default {
  name: 'OrdersPage',
  components: {
    Orders
  },
  mounted() {
    this.$store.dispatch('fetchCategories');
    this.$store.dispatch('fetchDishes');
    this.$store.dispatch('fetchTables');
    this.$store.dispatch('fetchWaiters');
    this.$store.dispatch('fetchBillsList',true);
  }
}
</script>
