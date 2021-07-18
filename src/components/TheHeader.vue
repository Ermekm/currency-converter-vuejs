<template>
  <header>
    <router-link to="currency-list">Список валют</router-link
    ><router-link to="converter">Конвертер</router-link>
  </header>
</template>

<script>
export default {
  methods: {
    routeTo(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
header {
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1;
}
a {
  box-sizing: border-box;
  width: 150px;
  border: none;
  padding: 0.6rem;
  margin: 0.5rem;
  background: #3938fc;
  font-weight: bold;
  border-radius: 3px;
  text-decoration: none;
  color: white;
  display: inline-block;
}

a.router-link-active {
  border: 3px solid #000061;
}
</style>