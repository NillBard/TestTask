<template>
  <div id="app">
    <lift-block :floor="floor"></lift-block>
    <div class="floor-wrapper">
      <storey-item
        v-for="n in 5"
        class="floor"
        :number="n"
        @call="(i) => (floor = i)"
      ></storey-item>
    </div>
  </div>
</template>

<script>
import LiftBlock from "./components/LiftBlock.vue";
import StoreyItem from "./components/storey.vue";
export default {
  name: "app",
  data() {
    return {
      floor: 1,
    };
  },
  components: { LiftBlock, StoreyItem },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  width: 100%;
  margin: 0 20px;
  display: flex;
  flex-direction: row;
}
.floor {
  background-color: transparent;
  z-index: 1;
}
.floor-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  background-color: transparent;
}
</style>
