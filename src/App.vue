<template>
  <the-header></the-header>
  <main class="test">
    <!-- <component :is="activeComponent"></component> -->
    <router-view></router-view>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TheHeader from "@/components/TheHeader.vue";

export default {
  name: "App",
  components: {
    "the-header": TheHeader,
  },
  data() {
    return {
      activeComponent: "currency-list",
    };
  },
  methods: {
    ...mapActions(["GET_CURRENCY"]),
  },
  computed: {
    ...mapGetters(["CURRENCY", "REVERSED_CURRENCY"]),
  },
  mounted() {
    this.GET_CURRENCY();
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  background: #4c8bf5;
  font-family: Roboto;
  color: #3c4043;
  text-align: center;
}

body::-webkit-scrollbar {
    width: 0;
}

main {
  width: 600px;
  display: inline-block;
  @media (max-width: 700px) {
    width: 90%;
  }
}
</style>
