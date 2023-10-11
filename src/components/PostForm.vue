<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <MyInput v-model="post.title" type="text" placeholder="Название поста" />
    <MyInput v-model="post.body" type="text" placeholder="Название" />
    <MyButton @click="createPost" style="align-self: flex-end; margin-top: 15px"
      >Send</MyButton
    >
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    };
  },
  methods: {
    createPost(event) {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        title: '',
        body: '',
      };
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
