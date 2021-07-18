import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state() {
    return {
      currency: {},
      reversedCurrency: {},
      countedCurrencyValue: '',
      majorHeader: 'ДолларСША',
      countedHeader: "Евро"
    }
  },
  getters: {
    CURRENCY(state) {
      return state.currency
    },
    REVERSED_CURRENCY(state) {
      return state.reversedCurrency
    },
    COUNTED_VALUE(state) {
      return state.countedCurrencyValue;
    },
    MAJOR_HEADER(state) {
      return state.majorHeader
    },
    COUNTED_HEADER(state) {
      return state.countedHeader;
    }
  },
  mutations: {
    SET_CURRENCY(state, currency) {
      state.currency = JSON.parse(JSON.stringify(currency)) //original currency list from API EU to RUB
      //creating reversed currency list RUB to EU
      state.reversedCurrency = JSON.parse(JSON.stringify(currency))
      for (let key in state.currency) {
        state.reversedCurrency[key].Nominal = 1;
        state.reversedCurrency[key].CharCode = "RUB";
        state.reversedCurrency[key].Value = (state.currency[key].Nominal / state.currency[key].Value).toFixed(4);
        state.reversedCurrency[key].ValueCode = state.currency[key].CharCode;
        state.reversedCurrency[key].Previous = state.currency[key].Nominal / state.currency[key].Previous;
        state.reversedCurrency[key].Difference = (state.reversedCurrency[key].Value - state.reversedCurrency[key].Previous).toFixed(5);
        state.currency[key].Difference = (state.currency[key].Value - state.currency[key].Previous).toFixed(4)
        state.currency[key].ValueCode = "RUB"
      }
    },
    SET_COUNTED_VALUE(state, payload) {
      state.countedCurrencyValue =  ((state.currency[payload.majorCode].Value * payload.majorValue) / (state.currency[payload.countedCode].Value/state.currency[payload.countedCode].Nominal)).toFixed(4)
    },
    SET_MAJOR_HEADER(state, payload) {
      state.majorHeader = state.currency[payload].Name
    },
    SET_COUNTED_HEADER(state, payload) {
      state.countedHeader = state.currency[payload].Name
    }
  },
  actions: {
    GET_CURRENCY({commit}) {
      axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
      .then((res) => {
        commit('SET_CURRENCY', res.data.Valute)
      })
    },
    GET_COUNTED_VALUE({commit}, payload) {
      commit('SET_COUNTED_VALUE', payload);
    },
    SET_MAJOR_HEADER({commit}, payload) {
      commit('SET_MAJOR_HEADER', payload);
    },
    SET_COUNTED_HEADER({commit}, payload) {
      commit('SET_COUNTED_HEADER', payload);
    },
  },
})
