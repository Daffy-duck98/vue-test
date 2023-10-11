<template>
  <button class="btn"><slot></slot></button>
</template>

<script>
export default {
  name: 'MyButton',
};
</script>

<style scoped>
.btn {
  margin: 5px;
  padding: 10px 15px;
  background: none;
  color: rgb(29, 167, 100);
  border: 1px solid rgb(29, 167, 100);
}
</style>
