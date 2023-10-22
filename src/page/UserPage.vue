<template>
  <div>
    <h1>Страница с постами</h1>
    <MyInput v-model="searchQuery" placeholder="Поиск ..." />
    <div class="app__btns">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions" />
    </div>
    <MyDialog v-model:show="dialogVisible">
      <PostForm @create="createPost" />
    </MyDialog>
    <PostList
      :posts="sortedAndSearchPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка</div>
    <div ref="observer" class="observer"></div>
    <!-- <div class="page__wrapper">
        <div
          v-for="pageNumber in totalPage"
          :key="pageNumber"
          class="page"
          :class="{
            'current__page ': pageNumber === page,
          }"
          @click="changePage(pageNumber)"
        >
          {{ pageNumber }}
        </div>
      </div> -->
  </div>
</template>

<script>
import PostList from '@/components/PostList';
import PostForm from '@/components/PostForm';
import MyDialog from '@/components/ui/MyDialog.vue';
import MyButton from '@/components/ui/MyButton.vue';
import MySelect from '@/components/ui/MySelect.vue';
import axios from 'axios';
import MyInput from '@/components/ui/MyInput.vue';

export default {
  components: {
    PostForm,
    PostList,
    MyDialog,
    MyButton,
    MySelect,
    MyInput,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      searchQuery: '',
      selectedSort: '',
      page: 1,
      limit: 8,
      totalPage: 0,
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
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPage = Math.ceil(
          response.headers['x-total-count'] / this.limit
        );
        this.posts = response.data;
      } catch (error) {
        alert('Error');
      } finally {
        this.isPostsLoading = false;
      }
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPage = Math.ceil(
          response.headers['x-total-count'] / this.limit
        );
        this.posts = [...this.posts, ...response.data];
      } catch (error) {
        alert('Error');
      }
    },
  },
  mounted() {
    this.fetchPosts();
    // console.log(this.$refs.observer);
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPage) {
        this.loadMorePosts();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((a, b) => {
        return a[this.selectedSort]?.localeCompare(b[this.selectedSort]);
      });
    },
    sortedAndSearchPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLocaleLowerCase())
      );
    },
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // },
  },
};
</script>

<style>
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}
.page__wrapper {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
.page {
  padding: 10px;
  border: 1px solid black;
}
.current__page {
  border: 2px solid rgb(78, 141, 79);
}
.observer {
  height: 30px;
  background: green;
}
</style>
