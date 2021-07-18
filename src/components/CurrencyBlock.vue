<template>
  <div class="currency-block">
    <h2>{{ item.Name }}</h2>
    <div class="container">
      <p>{{ item.Nominal }} {{ item.CharCode }}</p>
      <i class="material-icons">swap_horiz</i>
      <p>{{ item.Value }} {{ item.ValueCode }}</p>
      <i class="material-icons" :class="iconColor">{{ differenceIcon }}</i>
      <p :class="iconColor">
        {{ item.Difference }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  computed: {
    differenceIcon() {
      if (this.item.Difference > 0) {
        return "north";
      } else {
        return "south";
      }
    },
    iconColor() {
      if (this.item.Difference > 0) {
        return "green";
      } else {
        return "red";
      }
    },
  },
};
</script>

<style scoped lang="scss">
* {
  margin: 1rem;
}
.currency-block {
  background: white;
  box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.5);
  border-radius: 1rem;
  text-align: left;
}

.container {
  display: grid;
  grid-template-columns: auto auto 1fr auto auto;
  justify-items: left;
  align-items: center;
  margin: 0 1rem;
}

h2 {
  font-size: 1rem;
  padding-top: 1.5rem;
  margin-left: 2rem;
  margin-bottom: 0;
  text-align: left;
  color: grey;
  font-weight: 400;
}

p {
  font-weight: 600;
  color: #56585a
}

.green {
  color: #39bd65;
}
.red {
  color: #db5535;
}
</style>