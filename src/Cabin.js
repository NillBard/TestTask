export default class Cabin {
  constructor(
    num,
    queue = new Set(),
    currentFloor = 1,
    diff = 0,
    navigate = "",
    state = "waiting",
    top = 600
  ) {
    this._num = num;
    this._queue = queue;
    this._currentFloor = currentFloor;
    this._diff = diff;
    this._navigate = navigate;
    this._state = state;
    this._top = top;
  }

  get num() {
    return this._num;
  }
  get state() {
    return this._state;
  }
  get top() {
    return this._top;
  }
  get queue() {
    return this._queue;
  }
  get currentFloor() {
    return this._currentFloor;
  }
  get diff() {
    return this._diff;
  }
  get navigate() {
    return this._navigate;
  }

  set navigate(nav) {
    this._navigate = nav;
  }
  set queue(num) {
    this._queue.add(num);
  }
  set diff(num) {
    this._diff = num;
  }
  set currentFloor(num) {
    this._currentFloor = num;
  }
  set state(state) {
    this._state = state;
  }
  set num(num) {
    this._num = num;
  }
  set top(top) {
    this._top = top;
  }

  calc(floor) {
    return this._currentFloor - floor;
  }
}
