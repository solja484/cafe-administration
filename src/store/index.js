import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

const kitchenDishes = [{
    "name": "Цезар", "table": 8, status: false, isBeverage: false
}, {
    "name": "Карбонара", "table": 9, status: false, isBeverage: false
}, {
    "name": "Карамель-латте", "table": 3, status: false, isBeverage: true
}, {
    "name": "Чай зелений в ас.", "table": 3, status: true, isBeverage: true
}];


export default new Vuex.Store({
    namespaced: true,
    state: {
        loading: false,
        categories: [],
        dishes: [],
        kitchenDishes: [],
        billsList: [],
        currentBill: [],
        tables: [],
        waiters: []
    },
    getters: {
        loading: state => state.loading,
        categories: state => state.categories,
        dishes: state => state.dishes,
        kitchenDishes: state => state.kitchenDishes,
        billsList: state => state.billsList,
        currentBill: state => state.currentBill,
        tables: state => state.tables,
        waiters: state => state.waiters
    },
    actions: {
        fetchCategories({commit}) {
            commit("setLoading", true);
            axios
                .get('https://naukmacafeapi.azurewebsites.net/api/Menu/categories')
                .then((res) => commit("setCategories", res.data))
                .catch((err) => console.log(err))
                .finally(() => commit("setLoading", false));
        },
        fetchDishes({commit}) {
            commit("setLoading", true);
            axios
                .get('https://naukmacafeapi.azurewebsites.net/api/Menu/dishes')
                .then((res) => commit("setDishes", res.data))
                .catch((err) => console.log(err))
                .finally(() => commit("setLoading", false));
        },
        fetchKitchenDishes({commit}) {
            commit("setLoading", true);
            commit("setKitchenDishes", kitchenDishes);
            commit("setLoading", false);
        },
        fetchBillsList({commit, dispatch}, first) {
            commit("setLoading", true);

            axios
                .get('https://naukmacafeapi.azurewebsites.net/api/Order/all')
                .then((res) => {
                    commit("setBillsList", res.data)
                    if (first)
                        dispatch("fetchBillInfo", res.data[0].id);
                })
                .catch((err) => console.log(err))
                .finally(() =>


                    commit("setLoading", false));
        },
        fetchBillInfo({commit}, id) {
            commit("setLoading", true);
            axios
                .get('https://naukmacafeapi.azurewebsites.net/api/Order/' + id)
                .then((res) => commit("setBillInfo", res.data))
                .catch((err) => console.log(err))
                .finally(() => commit("setLoading", false));

        },
        fetchTables({commit}) {
            commit("setLoading", true);
            axios.get('https://naukmacafeapi.azurewebsites.net/api/Menu/tables')
                .then((res) => commit("setTables", res.data))
                .catch((err) => console.log(err))
                .finally(() => commit("setLoading", false));
        },
        fetchWaiters({commit}) {
            commit("setLoading", true);
            axios.get('https://naukmacafeapi.azurewebsites.net/api/Menu/waiters')
                .then((res) => commit("setWaiters", res.data))
                .catch((err) => console.log(err))
                .finally(() => commit("setLoading", false));
        },
        changeWaiter({commit}, data) {
            commit("setLoading", true);
            console.log(data);
            commit("setLoading", false);
        },
        createOrder({commit,dispatch},data) {
            commit("setLoading", true);
            axios
                .post('https://naukmacafeapi.azurewebsites.net/api/Order', data)
                .then((res) => dispatch("fetchBillInfo", res.id)
                    .then(() => dispatch("fetchBillsList"))
                    .catch((err) => console.log(err))
                    .finally(() => commit("setLoading", false))
                );
        },
        deleteOrder({commit,dispatch},id) {
            commit("setLoading", true);
            axios.delete('https://naukmacafeapi.azurewebsites.net/api/Order/'+id)
                .then(() => dispatch("fetchBillsList",true))
                .catch((err) => console.log(err))
                .finally(() => commit("setLoading", false))
        },
        addDishToOrder({commit,dispatch},data){
            commit("setLoading", true);

            axios.put('https://naukmacafeapi.azurewebsites.net/api/Order/'+data.orderId,data)
                .then(() => dispatch("fetchBillInfo",data.orderId))
                .catch((err) => console.log(err))
                .finally(() => commit("setLoading", false))
        }
    },
    mutations: {
        setLoading(state, load) {
            state.loading = load;
        },
        setCategories(state, data) {
            state.categories = data;
        },
        setDishes(state, data) {
            console.log(data)
            state.dishes = data;
        },
        setKitchenDishes(state, data) {
            state.kitchenDishes = data;
        },
        setBillsList(state, data) {
            console.log(data)
            state.billsList = data;
        },
        setBillInfo(state, data) {
            //TODO proper date format

            console.log('Order');
            console.log(data);
            state.currentBill = data;
            state.currentBill.totalSum = data.totalSum.toFixed(2);
            const dt = new Date(data.dateStart);
            state.currentBill.displayDate = dt.getFullYear() + "-" +
                ("0" + (dt.getMonth() + 1)).slice(-2) + "-" +
                ("0" + dt.getDate()).slice(-2) + " " +
                ("0" + dt.getHours()).slice(-2) + ":" +
                ("0" + dt.getMinutes()).slice(-2) + ":" +
                ("0" + dt.getSeconds()).slice(-2);
        },
        setTables(state, data) {
            state.tables = data;
        },
        setWaiters(state, data) {
            state.waiters = data;
        }
    }
})
