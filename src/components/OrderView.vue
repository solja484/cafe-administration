<template>
  <b-container class="container">
    <b-row>
      <p class="title-1">Чек #{{ currentOrder.id }} <br>
        <span class="subtitle-1">Стіл №{{ currentOrder.table }}</span>
      </p>
      <p>Офіціант: {{ currentOrder.waiterName }}
      </p>
      <p class="title-2">Деталі замовлення
        <b-button class="add-button float-right" variant="light" @click="showDishModal=true">
          <b-icon icon="plus"></b-icon>
        </b-button>
        <b-modal v-model="showDishModal" title="Нова страва">
          <span>Страва:</span><br>
          <b-form-select
              v-model="newDish"
              class="width-100"
              required>
            <option v-for="d in dishes" :key="d.id" :value="d.id">{{ d.name }}</option>
          </b-form-select><br><br>
      <span>Кількість:  {{ amount }}</span><br>
      <b-form-input v-model="amount" type="range" min="1" max="10"
                    class="width-100" style="color: #8D8EED !important;" ></b-form-input>

      <template #modal-footer>
        <b-button
            variant="light"
            @click="showDishModal=false">
          Скасувати
        </b-button>
        <b-button
            variant="light"
            class="iris float-right"
            :disabled="!newDish"
            @click="addNewDish(currentOrder.id)">
          Додати
        </b-button>
      </template>
      </b-modal>
      <br>
      <span class="subtitle-2">{{ currentOrder.displayDate }}</span>
      </p>
    </b-row>
    <b-row>
      <b-table-simple id="dishesTable" class="table">
        <b-tbody>
          <b-tr class="table-color-row">
            <b-th colspan="2">Назва</b-th>
            <b-th>К-сть х Ціна за 1</b-th>
            <b-th class="table-prices">Ціна ост.</b-th>
          </b-tr>
          <b-tr v-for="d in currentOrder.dishes" :key="d.id">
            <b-td colspan="2">
              {{ d.name }}
            </b-td>
            <b-td>
              {{ d.amount }}x{{ d.price.toFixed(2) }}
            </b-td>
            <b-td class="table-prices">
              {{ (d.amount * d.price).toFixed(2) }}
            </b-td>
          </b-tr>
          <b-tr class="table-color-row">
            <b-th colspan="3">Сума:</b-th>
            <b-th class="table-total table-prices">{{ currentOrder.totalSum }} UAN</b-th>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-row>
    <b-row>
      <b-col cols="3">
        <b-button variant="outline-success" @click="printOrder()">Друкувати чек</b-button>
      </b-col>
      <b-col cols="6"></b-col>
      <b-col cols="3">
        <b-button variant="outline-danger" class="float-right" @click="deleteOrder()">Видалити чек</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

export default {
  name: "OrderView",
  data() {
    return {
      waiter: this.$store.getters['currentBill'].waiter,
      showDishModal: false,
      newDish: null,
      amount: 1
    }
  },
  computed: {
    loading: function () {
      return this.$store.getters['loading']
    },
    currentOrder: function () {
      return this.$store.getters['currentBill']
    },
    waiters: function () {
      return this.$store.getters['waiters']
    },
    dishes: function () {
      return this.$store.getters['dishes']
    }
  },
  methods: {
    printOrder: function () {
//TODO print order
    },
    deleteOrder: function () {
      this.$store.dispatch('deleteOrder', this.currentOrder.id)
    },
    changeWaiter: function (w) {
      this.$store.dispatch('changeWaiter', {orderId: this.$store.getters['currentBill'].id, waiterId: w})
    },
    addNewDish: function (orderId) {
      const data = {
        "amount": this.$data.amount,
        "orderId": orderId,
        "dishId": this.$data.newDish
      }
      this.$store.dispatch('addDishToOrder', data)
    }
  }
}
</script>

<style scoped>
.container {
  text-align: left;
  padding: 20px 10px;
}

.title-1 {
  font-weight: bold;
  font-size: 18px;
}

.subtitle-1 {
  font-weight: normal;
  font-size: 16px;
}

.title-2 {
  margin-top: 20px;
  font-weight: bold;
  font-size: 16px;
}

.subtitle-2 {
  font-weight: normal;
  font-size: 14px;
}

.float-right {
  float: right;
}

.table {
  font-size: 14px !important;
  margin-top: 20px;
}

.table-total {
  font-size: 18px;
}

.table-color-row {
  background: white;
}

.table-prices {
  text-align: right !important;
}

.add-button, .add-button:hover, .add-button:active, .add-button:focus {
  color: white;
  background-color: #8D8EED !important;
  padding: 0 20px;
}

.width-100 {
  width: 100%;
}

.iris, .iris:hover, .iris:active, .iris:focus {
  color: white;
  background-color: #8D8EED !important;

}
</style>