<template>
  <div id="app">
    <div class="lift-wrapper">
      <lift-block
        v-for="lift in cabins"
        :key="lift.num"
        :floor="floor"
        :currentFloor="lift.currentFloor"
        :navigate="lift.navigate"
        :top="lift.top"
        :diff="lift.diff"
        :state="lift.state"
        :storey="floorCounts"
      >
      </lift-block>
    </div>
    <div class="floor-wrapper">
      <storey-item
        v-for="n in floorCounts"
        :key="n"
        class="floor"
        :queue="queue"
        :number="n"
        @call="
          (i) => {
            if (!queue.includes(i)) {
              add(i);
              stack.push(i);
              length = stack.length;
            }
          }
        "
      ></storey-item>
    </div>
  </div>
</template>

<script>
import LiftBlock from "./components/LiftBlock.vue";
import StoreyItem from "./components/storey.vue";
import { mapActions, mapMutations } from "vuex";

export default {
  name: "app",
  data() {
    return {
      floor: 1,
      liftCounts: 4,
      floorCounts: 6,
      length: 0,
      stack: [],
    };
  },
  components: { LiftBlock, StoreyItem },
  computed: {
    cabins() {
      return this.$store.state.cabins;
    },
    queue() {
      return this.$store.state.queue;
    },
  },
  methods: {
    ...mapActions({ move: "moveLift" }),
    ...mapMutations({ add: "setQueueEl" }),
  },
  watch: {
    queue: {
      async handler(value) {
        if (this.stack.length === this.length) {
          localStorage.setItem("queue", JSON.stringify(this.queue));
          const floor = this.stack.shift();
          await this.move({ floor });
        }
      },
      deep: true,
    },
  },

  async mounted() {
    this.$store.dispatch("setCabins", {
      count: this.liftCounts,
      top: 150 * (this.floorCounts - 1),
    });
    this.$store.dispatch("setQueue");
    if (this.queue.length > 0) {
      this.stack = [...this.queue];
      while (this.queue.length > 0) {
        await this.$store.dispatch("moveLift", { floor: this.stack.shift() });
      }
    }
  },
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

.lift-wrapper {
  display: flex;
  justify-content: space-between;
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
