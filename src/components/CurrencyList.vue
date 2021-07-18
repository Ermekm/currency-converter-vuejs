<template>
  <div class="wrapper">
      <input
        type="search"
        name="search"
        v-model="search"
        placeholder="Поиск по имени или коду валюты"
      />
    <button @click="reverseCurrency">Поменять основную валюту</button>
    <currency-block
      v-for="(item, index) in currency"
      :key="index"
      :item="item"
    ></currency-block>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CurrencyBlock from "@/components/CurrencyBlock.vue";

export default {
  data() {
    return {
      isCurrencyReversed: false,
      search: "",
    };
  },
  components: {
    "currency-block": CurrencyBlock,
  },
  computed: {
    ...mapGetters(["CURRENCY", "REVERSED_CURRENCY"]),
    currency() {
      if (this.isCurrencyReversed) {
        //Filtered currency list EU to RUB
        return Object.values(this.REVERSED_CURRENCY).filter((currency) => {
          return (
            currency.NumCode.match(this.search) ||
            currency.Name.toLowerCase().match(this.search.toLowerCase())
          );
        });
      } else {
         //Filtered reversed currency list RUB to EU
        return Object.values(this.CURRENCY).filter((currency) => {
          return (
            currency.NumCode.match(this.search) ||
            currency.Name.toLowerCase().match(this.search.toLowerCase())
          );
        });
      }
    },
  },
  methods: {
    ...mapActions(["GET_CURRENCY"]),
    reverseCurrency() {
      this.isCurrencyReversed = !this.isCurrencyReversed;
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  top: 60px;
}

button {
  position: sticky;
  top: 60px;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  padding: 0.6rem;
  background: #3938fc;
  color: white;
  margin: 1rem;
}

input[type="search"] {
  border: none;
  outline: none;
  border-radius: 2rem;
  width: 600px;
  font-size: 1rem;
  padding: 1rem
}

</style>