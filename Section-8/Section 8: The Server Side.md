# Section 8: The Server Side

Nuxt is "only" there to give you universal Vue applications, it's not a full stack framework. So it's purpose is to fetch and pre-render the data and then serve it to the client.

There are a few ways to achieve a deeper integration through custome server middleware.

## Adding Server Side Middleware

In Nuxt config, you can add server middleware to the server, not to be mixed up with middleware.

```js
const express = require("express");

const router = express.Router();

const app = express();
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});

router.post("/track-data", (req, res) => {
  console.log("Stored data!", req.body.data);
  res.status(200).json({ message: "Success!" });
});

module.exports = {
  path: "/api",
  handler: router,
};

// nuxt.config.js
module.exports = {
  serverMiddleware: [
    // register the server middleware body-parser
    bodyParser.json(),
    // hook in our own middleware
    "~/api",
  ],
};
```

## Testing the Middleware

We want to call the middleware when we authenticated a user.

```js
 return this.$axios
          .$post(authUrl, {...}).then(()=>{

        return this.$axios.$post("http://localhost:3000/api/track-data", {
            data: "Authenticated!",
    });
})
```

## Starting a Project with a server Side Template

You can use one of the other templates that Nuxt provides. 

```bash
create-nuxt-app server-side-focus
```

confirm name

then you can chose a custom server framework, for example express, adonis...

If you chose express, you'll get a deeper integration with "express" out of the box.

the package.json will have different dependencies and the script will be different (using cross-env, nodemon, and the server.js file)

To start a express server located in the server folder.

Note: our routes are still handled by nuxt via the vue pages. Express is only used as an API server.

