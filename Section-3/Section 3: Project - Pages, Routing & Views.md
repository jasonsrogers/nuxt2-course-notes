# Section 3: Project - Pages, Routing & Views

Let's build a complete blog where we'll apply what we've covered until now and expand on it with concepts introduced in later sections

## Creating the main "Sections" (Pages)

We're going to use the folder base approach to create our routes as we'll have sub pages (nested routes) in several sections

We're going to create the following routes:

- about
- posts
- posts/:id
- admin

## Adding External Fonts

Going to [Google Fonts](https://fonts.google.com/) we can select the fonts we want to use and then click on the "Embed" button to get the code we need to add to our HTML

But where do we add it? We have no HTML file, and we have multiple index.vue

We could add it to the default layout but there is a better way, the layout itself is a component loaded into an html that we don't see or have access to. However we can add the link to the font in the `nuxt.config.js` file

```js
export default {
  // ...
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Open+Sans",
      },
    ],
  },
};
```

Then assign the font to the default layout

```html
<style>
  html {
    font-family: "Open Sans", sans-serif;
  }
  body {
    margin: 0;
  }
</style>
```
