<template>
  <div class="wrapper" :style="{ height: `${150 * storey}px` }">
    <div
      class="lift"
      :class="{ shake: state === 'stopping' }"
      :style="{ top: `${pos}px`, transition: diff + 's' }"
    >
      <div class="panel">{{ currentFloor }} {{ navigate }}</div>
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
    storey: { type: Number, required: true },
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
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid rgb(144, 144, 2);
}

.panel {
  background-color: aqua;
  text-align: center;
  padding: 7px;
  font-size: larger;
  border-radius: 5px;
}

.wrapper {
  background: transparent;
  width: fit-content;
  padding: 0;
  border: 2px solid;
  margin: 0;
}

.shake {
  animation: shake 2s;
}

@keyframes shake {
  0% {
    background-color: rgb(245, 245, 209);
  }

  20% {
    background-color: rgb(249, 249, 40);
  }

  40% {
    background-color: rgb(245, 245, 209);
  }

  60% {
    background-color: rgb(249, 249, 40);
  }

  80% {
    background-color: rgb(245, 245, 209);
  }

  100% {
    background-color: rgb(249, 249, 40);
  }
}
</style>
