<template>
  <div class="navbar">
    <div class="navbar__btns">
      <MyButton @click="$router.push('/')">Main</MyButton>
      <MyButton @click="$router.push('/about')">About</MyButton>
      <MyButton @click="$router.push('/usersPosts')">Users</MyButton>
    </div>
  </div>
</template>

<script>
import MyButton from './MyButton.vue';

export default {};
</script>

<style>
.navbar {
  height: 50px;
  background-color: beige;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns {
  margin-left: auto;
}
</style>
