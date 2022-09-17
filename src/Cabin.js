export default class Cabin {
  constructor(
    num,
    top,
    currentFloor = 1,
    diff = 0,
    navigate = "",
    state = "waiting"
  ) {
    this.num = num;
    this.top = top;
    this.currentFloor = currentFloor;
    this.diff = diff;
    this.navigate = navigate;
    this.state = state;
  }
  calc(floor) {
    return this.currentFloor - floor;
  }
}
