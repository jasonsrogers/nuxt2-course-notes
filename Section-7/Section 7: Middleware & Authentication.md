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

## Adding User Signup

Firebase has a out of the box authentication system that we can use to add user signup. We're going to use the firebase Auth REST API.

Using
`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]`

## Storing the token

Let's first set write to require auth in the firebase rules.

```json
{
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}
```

setup a mutation to store the token in the store.

```js
 setToken(state, token) {
        state.token = token;
      },
```

then we get a sucessful response from the server, we can store the token in the store.

```js
 .then((result) => {
            vuexContext.commit("setToken", result.idToken);
 })
```

## Using the token

[Here](https://firebase.google.com/docs/database/rest/auth) we see how to authenticate with the token.

## Implementing a Middleware

Let's add a middleware to protect the auth routes.

```js
export default function (context) {
  console.log("[Middleware] Just Auth");
  if (!context.store.getters.isAuthenticated) {
    context.redirect("/admin/auth");
  }
}
```

Then lets add the middleware to all the pages admin that we want to protect.

```js
middleware: ['auth'],
```

Note: we could add it at a admin layout instead but we would have to move the /admin/auth to another layout.

## Invalidating the token

```js
setLogoutTimer(vuexContext, duration) {
        setTimeout(() => {
          vuexContext.commit("clearToken");
        }, duration);
      },
...
vuexContext.dispatch("setLogoutTimer", result.expiresIn * 1000);
```

## Persisting the token across page reloads

In a traditional SPA you would store the token in local storage and check if it exists on page load. However, in Nuxt, we load and execute code on the server too.

We could have the layouts dispatch an action to check if the token exists and then set it in the store. But with Nuxt, we can also leverage middleware.

```js
initAuth(vuexContext) {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("tokenExpiration");

    if (new Date().getTime() > +expirationDate || !token) {
        return;
    }
    vuexContext.dispatch(
        "setLogoutTimer",
        +expirationDate - new Date().getTime()
    );
    vuexContext.commit("setToken", token);
},

...

export default function(context) {
  console.log("[Middleware] Check Auth");
  if (process.client) {
    context.store.dispatch("initAuth");
  }
}

...

// add middleware on needed routes
middleware: ["check-auth", "auth"],
```

Note: order of middleware is important. The `check-auth` middleware should run before the `auth` middleware.

Note: we use `process.client` to check if we're on the client side, because initAuth relies on localStorage.

This will only work on the client side, lets see how to make it work on the server side too.

## Implementing cookies

We can't access local storage on the server, so we can use cookies instead.

```js
npm install --save js-cookie
```

```
Cookie.set("jwt", result.idToken);
```

Update out check-auth middleware to check for the cookie.

```js
context.store.dispatch("initAuth", context.req);
```

Context.req would only exist on the server side.

In authenticaion, set the cookie too

```js
 Cookie.set("jwt", result.idToken);
            Cookie.set(
              "expirationDate",
```

In initAuth, check for the cookie, otherwise use local storage.

```js
if (req) {
  if (!req.headers.cookie) {
    return;
  }
  const jwtCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith("jwt="));
  if (!jwtCookie) {
    return;
  }
  token = jwtCookie.split("=")[1];
  expirationDate = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith("expirationDate="))
    .split("=")[1];
} else {
  token = localStorage.getItem("token");
  expirationDate = localStorage.getItem("tokenExpiration");
}
```

## Updating logoutTimer

```js
if (new Date().getTime() > +expirationDate || !token) {
  vuexContext.commit("clearToken");
}
```

Since we now check the auth through our middleware everytime, we just need to clearToken if the token has expired.

## Adding the logout functionality

```js
logout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
```
