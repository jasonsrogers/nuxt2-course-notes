# Section 7: Middleware & Authentication

A classic example of Middleware is authentication so lets take a look at how to enable authentication in Nuxt via middleware.

## What is Middleware?

Middleware is a function that runs before the page is loaded. You can define it for all routes or for specific routes.

Simple log in middleware:

```js
export default function (context) {
  console.log("[Middleware] The Log Middleware is running");
}
```

Note: if running async code, you need to return a promise.

```js
export default function (context) {
  console.log("[Middleware] The Log Middleware is running");
  return axios.get("https://api.com/data").then((res) => {
    context.store.dispatch("setPosts", res.data);
  });
}
```

This will run on both the server and the client.

To use it we have to specify it on a page

```js
middleware: 'log',
```

Note: name of the file in middleware folder without the extension.

You can also attach it to a layout so that all pages that uses the layout will use the middleware. layout/default.vue

```js
export default {
  middleware: "log",
};
```

Note: a layout will execute as many times as it is defined, so if `log` is defined on a layout and a pages that uses the layout, you'll see the log twice.

For defining middleware for all routes, you can use the nuxt.config.js file.

```js
export default {
  router: {
    middleware: "log",
  },
};
```

Note: if there is redirects, it will also trigger

