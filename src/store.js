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
    setQueue(state, el) {
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
    setLift(state, lift) {
      state.cabins = state.cabins.map((el) => {
        console.log(el);
        if (el.num === lift.num) {
          el = lift;
        }
      });
    },
  },
  actions: {
    setCabins({ commit }, count) {
      const cabins = [];
      for (let i = 0; i < count; i++) {
        if (localStorage.getItem(i)) {
          cabins.push(localStorage.getItem(i));
        } else {
          cabins.push(new Cabin(i));
        }
      }
      commit("setCabins", cabins);
    },

    foundLift({ state, commit }, floor) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const arrDiff = [];
          let min = 10000;
          state.cabins.forEach((element, index) => {
            if (element.state === "waiting" && element.currentFloor !== floor)
              if (Math.abs(element.calc(floor)) < min) {
                min = Math.abs(element.calc(floor));
                arrDiff.push(index);
              }
          });

          if (arrDiff.length === 0) return;
          const index = Math.min([...arrDiff]);
          // console.log(arrDiff);
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
              // commit("setLift", lift);
              resolve(lift);
            }, state.diff * 1000);
          });
        })
        .then((cabin) => {
          console.log(cabin);
          setTimeout(() => {
            cabin.state = "waiting";
            commit("deleteFirstElement");
            return cabin;
          }, 2000);
        });
    },
  },
});

// .then((lift) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       lift.navigate = "";
//       lift.state = "stopping";
//       lift.diff = 0;
//       commit("setDiff", 0);
//       // commit("setLift", lift);
//       resolve(lift);
//     }, state.diff * 1000);
//   });
// })
// .then((cabin) => {
//   console.log(cabin);
//   setTimeout(() => {
//     cabin.state = "waiting";
//     // commit("setLift", cabin);
//     return cabin;
//   }, 2000);
// });
