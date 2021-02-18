import fb from 'firebase';
class Post {
  constructor(title, body, id = null) {
    this.title = title;
    this.body = body;
    this.id = id;
  }
}

export default {
  state: {
    posts: [],
  },
  getters: {
    loadAllPosts(state) {
      return state.posts.reverse();
    },
    showCountPosts(state) {
      return state.posts.length;
    },
  },
  mutations: {
    loadPosts(state, payload) {
      state.posts = payload;
    },
    createPost(state, payload) {
      state.posts.unshift(payload);
    },
    removePost(state, payload) {
      state.posts = state.posts.filter((p) => p.id !== payload);
    },
  },
  actions: {
    async fetchPosts(context) {
      const fbPosts = await fb
        .database()
        .ref('posts')
        .once('value');
      const posts = fbPosts.val();
      const newPosts = [];
      Object.keys(posts).forEach((key) => {
        const post = posts[key];
        newPosts.push(new Post(post.title, post.body, key));
      });
      context.commit('loadPosts', newPosts);
    },
    async createPost(context, payload) {
      const newPost = new Post(payload.title, payload.body);
      const post = await fb
        .database()
        .ref('posts')
        .push(newPost);
      context.commit('createPost', {
        ...newPost,
        id: post.key,
      });
    },
    async removePost(context, payload) {
      await fb
        .database()
        .ref('posts')
        .child(payload)
        .remove();
      context.commit('removePost', payload);
    },
  },
};
