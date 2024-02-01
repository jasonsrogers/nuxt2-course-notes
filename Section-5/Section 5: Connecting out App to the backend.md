# Section 5: Connecting out App to the backend

we've connected out app to dummy data that is fected and stored in the store. Now we need to connect it to the backend.

## Executing code on the server

We can execute code on the server by using the `nuxtServerInit` action in the store, but this limited and mostly to allow us to initialize the store with data from the correct backend.

Nuxt behind the scenes uses Express.js.

So if we inspect the context passed to `nuxtServerInit(vuexContext, context) {` we can see that it has a `req` property which is the request object.

## Adding firebase as a backend

Setup an account with a free plan on firebase.

firebase.google.com

Realtime database

For now change the rules to allow read and write to true.

## Using Firebase to store data

Change AdminPostForm to emit a with the inputted values.

```js
 onSave() {
      this.$emit('submit', this.editedPost)
    },
```

We install axios to make http requests. It makes handling requests easier and it works on both the client and server.

```bash
npm install --save axios
```

And now we can make a post request to firebase.

```js
onSubmitted(post) {
      axios
        .post(
          "[firebaseUrl]/posts.json",
          post
        )
        .then((result) => {
          console.log("Post created", result);
        })
        .catch((e) => {
          console.log(e);
        });
    },
```

No need for BE code. Firebase handles it all.

Note: we add `/posts` to create a posts collection in firebase. and it has to be `.json` at the end.

## Fetching data from the backend

Lets fetch the data in our nuxtServerInit action.

```js
 nuxtServerInit(vuexContext, context) {
        return axios
          .get(
            "[url]/posts.json"
          )
          .then((res) => {
            const postsArray = [];
            for (const key in res.data) {
              postsArray.push({ ...res.data[key], id: key });
            }
            vuexContext.commit("setPosts", postsArray);
          })
          .catch((e) => {
            context.error(e);
          });
      },
```

## Initializing our store

We need to tweak our store to initialize it with the data from the backend.

```js
:thumbnail="post.thumbnail"
:previewText="post.previewText"
```

## Fetching any posts details

```js
export default {
  asyncData(context) {
    return axios
      .get(`https://firebase.url/posts/${context.params.id}.json`)
      .then((res) => {
        return {
          loadedPost: res.data,
        };
      })
      .catch((e) => context.error(e));
  },
};
```

## Editing posts

```js
onSubmitted(editedPost) {
      axios
        .put(
          `https://firebase.url/posts/${context.params.id}.json`,
          {...editedPost, updatedDate: new Date()}
        )
        .then((result) => {
          console.log("Post updated", result);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
```

if we wanted to go back after submitting the form we can use the router.

```js
   .then((result) => {
          this.$router.push("/admin");
        })
```

But the data is not up to date because we fetch using NuxtServerInit which only runs on the server. So we need to fetch the data again.

```js
  asyncData(context) {
    return axios
      .get(`https://firebase.url/posts/${context.params.id}.json`)
      .then((res) => {
        return {
          loadedPost: res.data,
        };
      })
      .catch((e) => context.error(e));
  },
```

## Synchronizing Vuex and the backend

Our data does not update until we refresh the page because it's only loaded using nuxtServerInit. We could switch to only using asyncData but that would mean longer load times.

One solution is to manipulate the store directly.

Let's add new mutations to the store

```js
 addPost(state, post) {
        state.loadedPosts.push(post);
},
editPost(state, editedPost) {
  const postIndex = state.loadedPosts.findIndex(
    (post) => post.id === editedPost.id
  );
  state.loadedPosts[postIndex] = editedPost;
},
```

and actions

```js
addPost(vuexContext, post) {
        const createdPost = { ...post, updatedDate: new Date() };
        return axios
          .post(
            "firbaseurl/posts.json",
            createdPost
          )
          .then((result) => {
            vuexContext.commit("addPost", {
              ...createdPost,
              id: result.data.name,
            });
          })
          .catch((e) => {
            console.log(e);
          });
      },

```


```js
 onSubmitted(post) {
      this.$store.dispatch("addPost", post).then(() => {
        this.$router.push("/admin");
      });
    },
```

Note: we can't use $router in the store,  so it has to be in the callback 
Note: we can't user context.route.params.id 

