<template>
  <div class="wrapper">
    <div class="lift" :style="{ top: `${pos}px`, transition: diff + 's' }">
      {{ currentFloor }} {{ navigate }}
    </div>
  </div>
</template>

<script>
export default {
  name: "LiftBlock",
  data() {
    return {
      pos: 600,
    };
  },
  props: {
    top: { type: Number, required: true },
    floor: { type: Number, required: true },
    currentFloor: { type: Number, required: true },
    diff: { type: Number, required: true },
    state: { type: String, required: true },
    navigate: { type: String, required: true },
  },

  watch: {
    top(value) {
      this.pos = 0;
      this.pos += value;
    },
  },

  created() {
    this.pos = this.top;
  },
};
</script>

<style scoped>
.lift {
  position: relative;
  width: 100px;
  height: 150px;
  background-color: yellow;
}
.wrapper {
  background: transparent;
  width: fit-content;
  padding: 0;
  height: 750px;
  border: 2px solid;
  margin: 0;
  /* height: var(--storey-number)750px; */
}
</style>
