<template>
  <b-container class="container" fluid>
    <b-row v-if="loading">
      <b-col cols="3" class="mb-3"></b-col>
      <b-col cols="6" class="mb-3">
        <b-icon icon="three-dots" animation="cylon" font-scale="4" class="iris-loader"></b-icon>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col cols="3" class="kitchen-block">
        <p class="title">Страви</p>
        <p v-for="d in dishes" :key="d.name" class="item">
          <b-form-checkbox class="inline bold" :value="d.name"> {{ d.name }}</b-form-checkbox>
          <span v-if="!d.status" class="float-right">Ст.{{ d.table }}</span>
        </p>
      </b-col>
      <b-col></b-col>
      <b-col cols="3" class="kitchen-block">
        <p class="title">Напої</p>
        <p v-for="b in beverages" :key="b.name" class="item">
          <b-form-checkbox class="inline bold" :value="b.name" @click="changeStatus(b)"> {{ b.name }}</b-form-checkbox>
          <span class="float-right">Ст.{{ b.table }}</span>
        </p>
      </b-col>
      <b-col></b-col>
      <b-col cols="3" class="kitchen-block">
        <p class="title">Готово</p>
        <p v-for="d in allDishes" :key="d.name" class="item">
          <b-form-checkbox class="inline bold" :value="d.name"> {{ d.name }}</b-form-checkbox>
          <span class="float-right">Ст.{{ d.table }}</span>
        </p>


      </b-col>

    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Kitchen",
  computed: {
    loading: function () {
      return this.$store.getters['loading']
    },
    dishes: function () {
      return this.$store.getters['kitchenDishes'].filter(d => !d.isBeverage && !d.status)
    },
    beverages: function () {
      return this.$store.getters['kitchenDishes'].filter(d => d.isBeverage && !d.status)
    },
    allDishes: function () {
      return this.$store.getters['kitchenDishes'].filter(d => d.status)
    },
  },
  methods: {
    changeStatus: function () {
      //change status through the store
    }
  }
}
</script>

<style scoped>
.container {
  padding: 30px 10px;
}

.kitchen-block {
  background: #FAFAFC !important;
  border-radius: 5px;
}

.title {
  margin: 10px 5px;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
}

.item {
  text-align: left;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer !important;
}

.inline {
  display: inline
}

.float-right {
  float: right;
  font-weight: normal;
}

.iris-loader{
  color: #8D8EED;
  margin-top: 100px;
}
</style>