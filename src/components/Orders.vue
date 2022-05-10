<template>
  <b-container class="container" fluid>
    <b-row v-if="loading">
      <b-col cols="3" class="mb-3"></b-col>
      <b-col cols="6" class="mb-3">
        <b-icon icon="three-dots" animation="cylon" font-scale="4" class="iris-loader"></b-icon>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col cols="3" class="bills-list">
        <b-button block class="iris iris-block" variant="light" @click="showNewModal=true">+ Новий чек
        </b-button>
        <b-modal v-model="showNewModal" title="Новий чек" centered >
          <b-container>
            <b-form>
              <b-row class="pd-10">
                <b-col cols="4">Офіціант:</b-col>
                <b-col cols="8">
                  <b-form-select
                      v-model="waiter"
                      style="width:100%"
                      required>
                    <option v-for="w in waiters" :key="w" :value="w">{{ w }}</option>
                  </b-form-select>
                </b-col>
              </b-row>
              <b-row class="pd-10">
                <b-col cols="4">
                  Номер столика:
                </b-col>
                <b-col cols="8">
                  <b-form-select
                      v-model="table"
                      required
                      class="width-100">
                    <option v-for="t in tables" :key="t" :value="t">{{ t }}</option>
                  </b-form-select>
                </b-col>
              </b-row>
            </b-form>
          </b-container>
          <template #modal-footer>
            <b-button
                variant="light"
                @click="showNewModal=false">
              Скасувати
            </b-button>
            <b-button
                variant="light"
                class="iris float-right"
                :disabled="!table||!waiter"
                @click="createBill()">
              Створити
            </b-button>
          </template>
        </b-modal>

        <b-nav vertical>
          <b-nav-item v-for='o in orders' :key='o.id'
                      class="orders-link" :class="{ 'link-active': activeId==o.id }"
                      @click="viewBill(o.id)">
            #{{ o.id }}<span>Ст.{{ o.table }}</span>
          </b-nav-item>
        </b-nav>
      </b-col>
      <b-col cols="1"></b-col>
      <b-col cols="8" class="bill-preview">
        <OrderView></OrderView>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import OrderView from '@/components/OrderView.vue'

export default {
  name: "Orders",
  components: {OrderView},
  data() {
    return {
      waiter: this.$store.getters['waiters'][0],
      table: this.$store.getters['tables'][0],
      showNewModal: false,

    }
  },
  methods: {
    createBill: function () {
      this.$store.dispatch('createOrder',{
        "table": this.table,
        "waiterName": this.waiter,
        "dateStart": new Date()
      }).then(()=>this.showNewModal=false)

    },
    viewBill: function (id) {
      this.$store.dispatch("fetchBillInfo", id);
    }
  },
  computed: {
    loading: function () {
      return this.$store.getters['loading']
    },
    orders: function () {
      return this.$store.getters['billsList']
    },
    waiters: function () {
      return this.$store.getters['waiters']
    },
    tables: function () {
      return this.$store.getters['tables']
    },
    activeId: function () { return this.$store.getters['currentBill'].id}
  }
}
</script>

<style scoped>
.bills-list {
  background: #FAFAFC;
  border-radius: 5px;
  padding: 5px;
}

.bill-preview {
  background: #FAFAFC;
  border-radius: 5px;
}

.container {
  padding: 30px 10px;
}

.iris-loader {
  color: #8D8EED;
  margin-top: 100px;
}

.iris, .iris:hover, .iris:active, .iris:focus {
  color: white;
  background-color: #8D8EED !important;

}

.iris-block {
  width: 100%;
}

.modal-footer {
  justify-content: space-between !important;

}

.nav-link {
  font-weight: bold;
  color: black !important;
  text-align: left;
}

.nav-link span {
  color: black !important;
  float: right;
  font-weight: normal !important;
}

.nav-link:hover, .nav-link:focus, .nav-link:active {
  color: #7B7CE1 !important;
  background-color: #E4E5FF;
}

.link-active{
  color: #7B7CE1 !important;
  background-color: #E4E5FF;
}

.pd-10{
  padding: 10px;
  text-align: right;
}
.width-100{
  width: 100%;
}

</style>