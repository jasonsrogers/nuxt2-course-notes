# Section 9: Building a Nuxt app

Let's now look at deploying it

## Universal vs SPA vs static

### Universal

Build app and ship it to a node js server.
First view is rendered dynamically on the Server.
After first load, application turns into a SPA.

Great for SEO.

Node.js Host required

### SPA

App starts after first Load

App stays in SPA

Like a normal Vue App but simplified development

static host required (s3 for example)

### Static

Pre-rendered views during development are loaded on the client. You don't use a node js to render dynamically on the server. Instead the Views are pre-rendered at build time into static files

After first load, application turns into a SPA.

Great for SEO.

static host required (s3 for example)

## Building our App as Universal

```js
module.exports = {
  mode: "universal",
};
```

Then execute 2 scripts

```bash
npm run build
```

We get our optimized build in `.nuxt` folder, with all the files and folders we need.

Then we can start our server with

```bash
npm run start
```

This will start our server on our node machine.

## Deploying a Universal App

So you want to deploy a Universal app - here's how it works:

First of all, you need to build the app, just as shown in the previous lecture:

```bash
npm run build
```

Thereafter, you can simply upload your entire project folder (including the .nuxt/ folder and the node_modules folder as well as the package.json and nuxt.config.js files) to your web server.

Important: This web server has to run Node.js version 8.x or higher!

You can choose any hosting provider you want - such as Heroku, AWS (EC2 or Elastic Beanstalk) etc.

Depending on the provider, you might not need to upload the node_modules folder because the npm install command will be run automatically. It doesn't hurt to also ship the node_modules folder though (except for the increased upload file size).

Make sure that the `npm start` command gets executed on your chosen hosting platform - for most providers, this should be the default. npm start will start the Node server provided and configured by Nuxt.js and will basically enable the server-side rendering of Vue apps.

And that's already all that's to it!

## Building our App as SPA

```js
module.exports = {
  mode: "spa",
};
```

```bash
npm run build
```

We won't get a `.nuxt` folder, but we will get a `dist` folder. We'll only deploy the content `dist` folder to our static host (s3 for example).

If you want to see it in action.

```
npm install -g http-server
```

Then run the server in the dist folder

```bash
http-server -p 8082
```

Track data fails because we don't have a server to handle the request.

But we also don't see any data. We can log in but don't see anything.

If we create a new post we do see it.

This is because we are using the SPA mode and we don't call nuxtServerInit where we load the posts into the store.

Instead we need to trigger a call using `mounted` `created`.

Also make sure that your client is configured to use the correct base URL to the index.html file in the dist folder.

## Fetching Data in the SPA

The SPA (single page application) is kind of broken - fetching data (posts) doesn't work because that happens in nuxtServerInit.

Here are some possible "fixes":

1. Add asyncData to your pages/index.vue , pages/posts/index.vue and pages/admin/index.vue components. Reach out to your backend in all of them and simply load the posts this way.

Alternatively, you implement fetch() and don't just load the posts but also store them on the server (i.e. you make your Http request and then dispatch() your fetched posts to the server).

2. Use the created() or mounted() lifecycle hook Vue.js provides.

You can add that method to your default and admin layout components. Send your Http requests from inside there and update the Vuex store by dispatching the fetched posts to it.

## Building our app as Static Website

```js
mode: "universal";
```

Note: this also works with `mode: "spa"` but it would only generate a single page.

With `mode: "universal"` it will generate all pages.

```bash
npm run generate
```

This will generate a folder for each route in the `dist` folder. It will will have html for the posts etc.

Only the entry points (routes) will be generated as html files when you navigate away it switches to SPA mode.

There is a problem though, if you reload a page like the single post page because it's a dynamic route, not an entry point.

It can't be pre-rendered because it doesn't know the ids etc at build time.

## Improving the generate process

in the nuxt.config.js file

```js
generate: {
    routes: function() {
       `/posts/123'
    }
}
```

This takes a function that returns an array of routes that should be pre-rendered.

Let's run `npm run generate` again and we see a `dist/posts/123/index.html` the pre-rendered page.

We can also use axios to fetch the posts and then return the array of routes.

```js
const axios = require("axios")

...

generate: {
    routes: function() {
        return axios.get("https://firebase-url/posts.json")
            .then(res => {
                const routes = []
                for (const key in res.data) {
                    routes.push(`/posts/${key}`)
                }
                return routes
            })
    }
}
```

now we'll generate a route for each post.

## Limiting the amount of http requests

```js
generate: {
    routes: function() {
        return axios.get("https://firebase-url/posts.json")
            .then(res => {
                const routes = []
                for (const key in res.data) {
                    routes.push({
                        route: `/posts/`+key,
                        payload: {
                            postData: res.data[key]
                        }
                    })
                }
                return routes
            })
    }
}
```

in `pages/posts/_id/index.vue` we can adjust the `asyncData` method to use the payload.

```js
if(context.payload) {
    return {
        loadedPost: context.payload.postData
    }
}
...
```
This will use the data already loaded to pre-render the page rather than fetching it again.

## Adjusting the store

Lets think the localstorage during the generate process.

```js
} else (process.client) {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        }
```

If we have a client we are either in the browser or in the server, but generating won't have a client.

## Deploying SPAs and Static Webpages

So you either built a SPA or static webpage (i.e. no Universal app)?

Deploying these kind of apps is super simple!

After building the app (npm run build ), you just need to upload your dist/  folder content (just the content, not the folder itself!) to a static host like AWS S3 or Firebase Hosting.

That's all! 

No other folders or files do need to be deployed since your code has already been built, optimized and prepared to require no Node.js server anymore.

