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



