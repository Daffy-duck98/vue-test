<template>
  <div class="post">
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Название:</strong>{{ post.title }}</div>
      <div><strong>Описание:</strong>{{ post.body }}</div>
    </div>
    <div class="post__btns">
      <MyButton @click="$emit('remove', post)">Удалить</MyButton>
      <MyButton @click="$router.push(`/usersPosts/${post.id}`)">Open</MyButton>
    </div>
  </div>
</template>

<script>
import MyButton from './ui/MyButton.vue';

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  components: { MyButton },
};
</script>

<style scoped>
.post {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border: 2px solid black;
  margin-top: 15px;
}
.post__btns {
  display: flex;
}
</style>
