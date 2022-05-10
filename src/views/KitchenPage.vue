<template>
  <Kitchen/>
</template>
<script>
import Kitchen from '@/components/Kitchen.vue'

export default {
  name: 'KitchenPage',
  components: {
    Kitchen
  },
  mounted() {
    this.$store.dispatch('fetchKitchenDishes');
  }
}
</script>