<template>
  <div class="wrapper">
    <div class="lift" :style="{ top: `${topp}px`, transition: diff + 's' }">
      {{ floor }} {{ diff }}
    </div>
  </div>
</template>

<script>
export default {
  name: "LiftBlock",
  data() {
    return {
      topp: 600,
      time: 4,
      currentFloor: 1,
      diff: 0,
      navigate: "",
    };
  },
  props: {
    floor: { type: Number, required: true },
  },
  watch: {
    diff(value) {
      if (this.navigate == "up") {
        this.topp = this.topp - this.diff * 150;
      } else if (this.navigate == "down") {
        this.topp = this.topp + this.diff * 150;
      }
      setTimeout(() => {
        this.diff = 0;
      }, 1000);
    },
    floor(value) {
      let difference = 0;
      difference = this.currentFloor - this.floor;
      if (difference > 0) {
        this.navigate = "down";
      } else if (difference < 0) {
        this.navigate = "up";
      }
      this.currentFloor = this.floor;
      this.diff = Math.abs(difference);
      return Math.abs(difference);
    },
  },
  methods: {
    downFloor() {
      this.topp += 150;
    },
    upFloor() {
      this.topp -= 300;
    },
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
  border: 1px solid;
  margin: 0;
  /* height: var(--storey-number)750px; */
}
</style>
