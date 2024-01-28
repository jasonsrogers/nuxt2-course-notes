# Section 4: handling data

So far we've been using static data, but we want to use dynamic data as if we were fetching it from an API.

## Adding Dynamic Data

Let's change PostList to use dynamic data by passing in a list of posts as a prop.

```js
posts: {
      type: Array,
      required: true,
    },
```

and v-for over the posts prop

````html
<PostPreview
  v-for="post in posts"
  :key="post.id"
  :id="post.id"
  :is-admin="isAdmin"
  :thumbnail="post.thumbnail"
  :title="post.title"
  :previewText="post.previewText"
/>
``` ```
<PostList :posts="loadedPosts" />
````

## Preparing Data on the Server-Side through Nuxt

If you add an `asyncData` method to a page component (and only a page component), Nuxt will call that method before rendering the page and pass the result as a prop to the page component.

Note: `data()` is called on the client side, `asyncData()` is called on the server side. So it might causes some issues if you redefine the same data in both methods.

Note: `asyncData()` is called before `created()`, before the component is created. So you cannot use `this` in `asyncData()`.

`asyncData()` needs to know when the data is loaded. To do this we can either return a promise

```
asyncData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
  ...

```

or use the callback

```
asyncData(context, callback) {
    setTimeout(() => {
      callback(null, {

```

Now it will take 1.5 seconds to load the page and we can see the data is in the html source.

Now the loading happens on the server. This makes the page load faster and is better for SEO.

## asyncData on Client & Server

Once the page is loaded, the client will take over as a SPA. So if you navigate to the page, the client will take over and the page will be re-rendered.

So when the page is loaded the first time, `asyncData()` is called on the server. When you navigate to the page, `asyncData()` is called on the client.

## A closer look at the context object

If you log the context object, you can a bunch of information about where the code is running.

```

$config: {_app: {…}}
app: {head: {…}, router: VueRouter, nuxt: {…}, render: ƒ, data: ƒ, …}
base: "/"
env: {}
error: ƒ error(err)
from: {name: 'posts', meta: Array(1), path: '/posts', hash: '', query: {…}, …}
isDev: true
isHMR: false
isStatic: false
next: ƒ ()
nuxtState: {layout: 'default', data: Array(1), fetch: {…}, error: null, serverRendered: true, …}
params: {}
payload: undefined
query: {}
redirect: ƒ (status, path, query)
route: {name: 'index', meta: Array(1), path: '/', hash: '', query: {…}, …}
```

This is useful for things like parsing the route for loading data.

## Adding async data to a single post page

Let's add async data for a single post page.

```js
 asyncData(context, callback) {
    setTimeout(() => {
      callback(null, {
        loadedPost: {
          id: "1",
          title: "First Post (ID: " + context.route.params.id + ")",
          previewText: "This is our first post!",
          author: "Maximilian",
          updatedDate: new Date(),
          content:
            "Some dummy text which is definitely not the preview text though!",
          thumbnail:
            "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
        },
      });
    }, 1000);
```

by doing so, the first post will be loaded on the server side and loaded with the page. subsequent posts will be loaded on the client side.

Note: inside of async, we don't have `this.route.params.id` so we need to use `context.route.params.id`

## Handling Errors with a callback

What if the call in asyncData fails?

```js
asyncData(context, callback) {
    setTimeout(() => {
      callback(new Error('Oops something went wrong'),null)
    })
}
```

Passing an error to the callback will cause the page to fail to load and it will show the error layout.

If we were using a promise based approach, we could use

```js
return new Promise().catch((err) => {
  context.error(new Error("Oops something went wrong"));
});
```

## Using promises in async data

```js
asyncData(context, callback) {
    setTimeout(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            loadedPosts: [
              {
                id: "1",
                title: "First Post",
                previewText: "This is our first post!",
                thumbnail:
                  "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
              },
              {
                id: "2",
                title: "Second Post",
                previewText: "This is our second post!",
                thumbnail:
                  "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
              },
            ],
          });
        }, 1500);
      });
    });
  },
```

## Adding the VuexStore

Currently we load data every time we navigate to a page. This might be correct if the data is radically different, but if we are loading the same data, we should use a store.

Enter Vuex.

There is no need to install Vuex, it is already installed by Nuxt. We just need to some files to configure it.

There are 2 modes you can use:

- classic mode: you have a single store
  Create an index.js file in the store folder
  one store and module for the app
  define mutations, actions and getters in index.js

- modules mode: you have multiple stores
  Create multiple.js files in the store folder
  Every .js file becomes a namespaced module
  define mutations, actions and getters in each .js file

```
import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
    },
    actions: {
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
    },
  });
};

export default createStore;

```

Note: we use a function to return the state so that we can use it as a factory function. This is useful if you want to create multiple instances of the store. Otherwise, every connecting user would share the same store.

With the store in place, we can now use it in our pages. Nuxt takes care to inject the store into the rest of the app

```
created() {
    // runs after asyncData loads the data
    this.$store.dispatch("setPosts", this.loadedPost);
  },
```

This works, but it is not ideal. There is a better way to preload data.

## Vuex, fetch and nuxtServerInit

Instead of asyncData, we can use the fetch method. This method is called before the page is rendered and it is called on the server and the client.

We get context and return a promise

```js
fetch(context) {
return new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      loadedPosts: [
        {
          id: "1",
          title: "First Post",
          previewText: "This is our first post!",
          thumbnail:
            "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
        },
        {
          id: "2",
          title: "Second Post",
          previewText: "This is our second post!",
          thumbnail:
            "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
        },
      ],
    });
  }, 1500);
  // reject(new Error("Oops something went wrong"));
}).then((data) => {
  context.store.dispatch("setPosts", data.loadedPosts);
});
}
```

This will fail because we are trying to access the data object, but we no longer return the loadedPosts object. instead we use the store to set the posts.

Instead we can setup a computed property (so that it's always up to date) to get the posts from the store.

```js
 computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    },
  },
```

This works great and same to asyncData (if we don't want to merge the loaded data with the component data).

But we would have to duplicate the code for every page. Instead we can use nuxtServerInit.

In the store, we can add a nuxtServerInit action. This action is called before the app is rendered and it is called on the server only.

```js
 nuxtServerInit(vuexContext, context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        vuexContext.commit("setPosts", [
          {
            id: "1",
            title: "First Post",
            previewText: "This is our first post!",
            thumbnail:
              "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
          },
          {
            id: "2",
            title: "Second Post",
            previewText: "This is our second post!",
            thumbnail:
              "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
          },
        ]),
          resolve();
      }, 1500);
      // reject(new Error("Oops something went wrong"));
    });
  },


```
