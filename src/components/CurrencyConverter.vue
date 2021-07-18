<template>
  <div class="wrapper">
    <div class="block">
      <h2>{{ MAJOR_HEADER }}</h2>
      <div>
        <select class="currency" v-model="majorCode">
          <option
            v-for="(item, index) in CURRENCY"
            :key="index"
            :value="item.CharCode"
          >
            {{ item.CharCode }}
          </option>
        </select>
        <input type="text" v-model="majorValue" />
      </div>
    </div>
    <i class="material-icons icon-white md-40" @click="changeCode"
      >swap_horizontal_circle</i
    >
    <div class="block">
      <h2>{{ COUNTED_HEADER }}</h2>
      <div>
        <select class="currency" v-model="countedCode">
          <option
            v-for="(item, index) in CURRENCY"
            :key="index"
            :value="item.CharCode"
          >
            {{ item.CharCode }}
          </option>
        </select>
        <input type="text" id="num" v-model="COUNTED_VALUE" disabled />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "CURRENCY",
      "COUNTED_VALUE",
      "MAJOR_HEADER",
      "COUNTED_HEADER",
    ]),
  },
  methods: {
    ...mapActions([
      "GET_COUNTED_VALUE",
      "SET_MAJOR_HEADER",
      "SET_COUNTED_HEADER",
    ]),
    changeCode() {
      const temp = this.majorCode;
      this.majorCode = this.countedCode;
      this.countedCode = temp;
    },
    changeValues() {
      this.GET_COUNTED_VALUE({
        majorCode: this.majorCode,
        countedCode: this.countedCode,
        majorValue: this.majorValue,
      });
      this.SET_MAJOR_HEADER(this.majorCode);
      this.SET_COUNTED_HEADER(this.countedCode);
    },
  },
  data() {
    return {
      majorValue: "",
      majorCode: "USD",
      countedCode: "EUR",
    };
  },
  watch: {
    majorValue() {
      this.changeValues();
    },
    majorCode() {
      this.changeValues();
    },
    countedCode() {
      this.changeValues();
    },
  },
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrapper {
  position: relative;
  top: 80px;
  display: grid;
  grid-template-columns: 1fr 60px 1fr;
  align-items: center;
  @media (max-width: 700px) {
    width: 90%;
  }
}

h2 {
  padding: 1rem 1.2rem 0 0.5rem;
  font-size: 1rem;
  text-align: left;
  color: grey;
  font-weight: 400;
}

select {
  width: 30%;
  height: 40px;
  font-size: 1rem;
  cursor: pointer;
  outline: none;
  border: none;
}

.block {
  padding: 0 1rem;
}

input {
  height: 1.2rem;
  width: 60%;
  font-size: 1rem;
  outline: none;
  border: none;
  border-bottom: 1px solid black;
  background: white;
  margin-left: 1rem;
}

input:focus {
  border-bottom: 2px solid #3938fc;
}

.icon-white {
  color: white;
}

.md-40 {
  font-size: 40px;
}

i:hover {
  cursor: pointer;
}

.block {
  background: white;
  box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.5);
  border-radius: 5px;
}
</style>