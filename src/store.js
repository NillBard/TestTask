import { createStore } from "vuex";
import Cabin from "./Cabin";

export const store = createStore({
  state: {
    cabins: undefined,
    diff: 0,
    queue: [],
    index: 0,
  },
  mutations: {
    setCabins(state, cabins) {
      state.cabins = cabins;
    },
    setDiff(state, diff) {
      state.diff = diff;
    },
    setQueue(state, queue) {
      state.queue = queue;
    },
    setQueueEl(state, el) {
      state.queue = [...state.queue, el];
    },
    setIndex(state, index) {
      state.index = index;
    },
    setCurrentLift(state, cabin) {
      state.currentLift = cabin;
    },
    deleteFirstElement(state) {
      state.queue.shift();
    },
  },
  actions: {
    setQueue({ commit }) {
      let queue = [];
      if (localStorage.getItem("queue")) {
        queue = [...JSON.parse(localStorage.getItem("queue"))];
        console.log(queue);
      }
      commit("setQueue", queue);
    },

    setCabins({ commit }, count) {
      const cabins = [];
      for (let i = 0; i < count; i++) {
        if (localStorage.getItem(i)) {
          const obj = JSON.parse(localStorage.getItem(i));
          cabins.push(
            new Cabin(
              obj.num,
              obj.currentFloor,
              obj.diff,
              obj.navigate,
              obj.state,
              obj.top
            )
          );
        } else {
          cabins.push(new Cabin(i));
        }
      }
      console.log(cabins[0]);
      commit("setCabins", cabins);
    },

    foundLift({ state, dispatch, commit }, floor) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let index;
          let min = 10000;
          state.cabins.forEach((element, i) => {
            if (element.state === "waiting" && element.currentFloor !== floor)
              if (Math.abs(element.calc(floor)) < min) {
                min = Math.abs(element.calc(floor));
                index = i;
              }
          });

          if (index === undefined) return dispatch("moveLift", { floor });

          const diff = state.cabins[index].calc(floor);
          commit("setDiff", diff);
          commit("setIndex", index);
          resolve();
        }, 1000);
      });
    },

    moveLift({ state, commit, dispatch }, { floor }) {
      return dispatch("foundLift", floor)
        .then(() => {
          const currentLift = state.cabins.find((el) => el.num === state.index);
          currentLift.state = "move";
          const nav = state.diff;
          const diff = Math.abs(state.diff);
          commit("setDiff", diff);
          currentLift.diff = diff;
          currentLift.currentFloor = floor;

          if (nav > 0) {
            currentLift.navigate = "down";
            currentLift.top = currentLift.top + diff * 150;
          } else if (nav < 0) {
            currentLift.navigate = "up";
            currentLift.top = currentLift.top - diff * 150;
          }

          return currentLift;
        })
        .then((lift) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              lift.navigate = "";
              lift.state = "stopping";
              lift.diff = 0;
              commit("setDiff", 0);
              resolve(lift);
            }, state.diff * 1000);
          });
        })
        .then((cabin) => {
          setTimeout(() => {
            cabin.state = "waiting";
            console.log(state.queue);
            commit("deleteFirstElement");
            localStorage.setItem(cabin.num, JSON.stringify(cabin));
            localStorage.setItem("queue", JSON.stringify(this.queue));

            return cabin;
          }, 2000);
        });
    },
  },
});
