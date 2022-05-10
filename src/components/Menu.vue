<template>
  <b-container class="container" fluid>
    <b-row v-if="loading">
      <b-col cols="3" class="mb-3"></b-col>
      <b-col cols="6" class="mb-3">
        <b-icon icon="three-dots" animation="cylon" font-scale="4" class="iris-loader"></b-icon>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col></b-col>
      <b-col cols="10">
        <div class='menu-category' v-for="c in categories" :key="c.id">
          <p>{{ c.name }}</p>
          <b-row>
          <b-col cols="5"><DishesList :category="c.id" class="menu-dishes"></DishesList></b-col>
            <b-col cols="5"><b-img fluid rounded  :src="c.img" :alt="c.name"></b-img></b-col>
          </b-row>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>

import DishesList from '@/components/DishesList.vue'

export default {
  name: "Menu",
  components: {DishesList},
  computed: {
    loading: function () {
      return this.$store.getters['loading']
    },
    categories: function () {
      return this.$store.getters['categories']
    }
  }
}


</script>

<style scoped>
.container {
  padding: 30px 10px;
}

.menu-category {
  font-weight: bold;
  font-size: 16px;
  text-align: left;
}

.menu-dishes {
  font-weight: normal;
  font-size: 14px;
  margin-left: 30px;
}
.iris-loader{
  color: #8D8EED;
  margin-top: 100px;
}
</style>