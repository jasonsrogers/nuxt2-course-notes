# Section 6: Nuxt - config, plugins & Modules

In this module we're going to look at the Nuxt configuration file, plugins and modules.

## The Nuxt config file

Config determines how nuxt builds and outputs the app.

### Mode:

- `universal`: take advantage of server side rendering
- `spa`: single page application (no server side rendering)

### head:

define information that goes in the head of the document.
`<head>`
title, meta (javascript object that reflect the meta info), link(links to cdn, stylesheets), etc.

Note:
These are global to all pages, but you can add a `head` object to any `page` object to override the global head.

```js
export default {
  head: {
    title: "Nuxt.js",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Meta description" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
};
```

## Loading

controls the progress bar at the top of the page.

you can change:

```js
export default {
  loading: { color: "red", height: "5px", failedColor: "blue", duration: 5000 },
};
```

Note: if using `spa` mode, you can use the `loadingIndicator` property to change the loading indicator. The `loadingIndicator` is built in spinner that shows when the page is loading on the client the first time.

```js
export default {
  loadingIndicator: {
    name: "circle",
    color: "red",
    background: "blue",
  },
};
```

### css

Used to include global css files.

```js
export default {
  css: ["~/assets/main.css"],
};
```

### build

Change the build process.

### dev

boolean to determine if the app is in development mode.

Note: 
`nuxt build` and `nuxt start` will always override this to `false`.

## Working with environment variables

`env` property set the environment variables that will be injected into your project.

You can reference global environment variables from your node environment and forwad them into your app.

```js
export default {
  env: {
    baseUrl: process.env.BASE_URL || "http://firebaseUrl",
  },
};
```

and use it in your app like this:

```js
axios.post(process.env.baseUrl + "/posts.json", post);
```

The variable will be replaced with the value of `process.env.BASE_URL` at compilation time.

## Manipulating Routing Settings

`generate` changes the way Nuxt generates pages 

`rootDir` changes the root directory of the project. (by default it's `/`)

`router` changes the default settings of the router. You never directly configure a router in Nuxt or interact with it.

You can use all the Vue Router Construction Options (check Vue docs for more info)

```js
export default {
  router: {
    base: "/my-app/", // web server folder structure 
    extendRoutes(routes, resolve) {
      // programmatically add routes
      routes.push({
        name: "custom",
        path: "*", // catch all routes
        component: resolve(__dirname, "pages/index.vue"),
      });
    },
    linkActiveClass: "active", // add class to active links
  },
};
```
 




