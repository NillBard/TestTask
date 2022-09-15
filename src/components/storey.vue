<template>
  <div class="wrapper">
    <button class="callButton" @click="$emit('call', number)">
      {{ number }}
    </button>
  </div>
</template>

<script>
export default {
  name: "StoreyItem",
  props: { number: { type: Number, required: true } },
};
</script>

<style scoped>
.wrapper {
  margin: 0;
  width: 100%;
  height: 150px;
  border: 1px solid gray;
}
.callButton {
  margin-left: 150px;
  margin-top: 50px;
  padding: 10px;
  border-radius: 5px;
  background-color: yellowgreen;
}
</style>
