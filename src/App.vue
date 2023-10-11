<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <div class="app__btns">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions" />
    </div>
    <MyDialog v-model:show="dialogVisible">
      <PostForm @create="createPost" />
    </MyDialog>
    <PostList
      :posts="sortedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка</div>
  </div>
</template>

<script>
import PostList from '@/components/PostList';
import PostForm from '@/components/PostForm';
import MyDialog from '@/components/ui/MyDialog.vue';
import MyButton from '@/components/ui/MyButton.vue';
import MySelect from '@/components/ui/MySelect.vue';

import axios from 'axios';

export default {
  components: {
    PostForm,
    PostList,
    MyDialog,
    MyButton,
    MySelect,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' },
      ],
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        setTimeout(async () => {
          const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts?_limit=10'
          );
          this.isPostsLoading = false;
          this.posts = response.data;
        }, 2000);
      } catch (error) {
        alert('Error');
      } finally {
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((a, b) => {
        return a[this.selectedSort]?.localeCompare(b[this.selectedSort]);
      });
    },
  },
  // watch: {
  //   selectedSort(newValue) {
  //     this.posts.sort((a, b) => {
  //       return a[this.selectedSort]?.localeCompare(b[this.selectedSort]);
  //     });
  //   },
  // },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  padding: 20px;
}
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}
</style>
./components/UI/MyDialog.vue./components/UI/MyButton.vue
