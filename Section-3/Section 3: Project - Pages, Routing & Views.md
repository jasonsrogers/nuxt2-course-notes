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

## Creating the Landing Page

Let's clear the default and start from scratch

```html
<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news!</h1>
    </section>
    <section class="featured-posts">
      <nuxt-link :to="'/posts/' + 1" class="post-preview">
        <article>
          <div
            class="post-thumbnail"
            style="
              background-image: url('https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg');
            "
          ></div>
          <div class="post-content">
            <h1>Post Title</h1>
            <p>Preview Text</p>
          </div>
        </article></nuxt-link
      >
    </section>
  </div></template
>
```

## Splitting the page into components

We're seeing that our page is getting big, let's split it into components

The perfect example is our posr preview, let's create a component for it

Let's create a folder called `components/Posts` and inside it a file called `PostPreview.vue` where we'll copy the html and css from index

```html
<template>
  <nuxt-link :to="'/posts/' + 1" class="post-preview">
    <article>
      <div
        class="post-thumbnail"
        style="
          background-image: url('https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg');
        "
      ></div>
      <div class="post-content">
        <h1>Post Title</h1>
        <p>Preview Text</p>
      </div>
    </article>
  </nuxt-link>
</template>

<style scoped>
  .post-preview {
    border: 1px solid #ccc;
    box-shadow: 0 2px 2px #ccc;
    background-color: white;
    width: 90%;
  }
  ...;
</style>
```

Then we can import it into our index page

```js
<script>
import PostPreview from '@/components/Posts/PostPreview';
```

Note: @ to import from the root folder, no `.vue` (added automatically)

```js
export default {
  components: {
    PostPreview
  }
};
</script>
```

Tell Page/Component to use the component

Now lets pass data to the component, define props

```html
export default { name: "PostPreview", // Not necessary, but good practice props:
{ id: { type: String, required: true, }, title: { type: String, required: true,
}, previewText: { type: String, required: true, }, thumbnail: { type: String,
required: true, }, }, };
```

Use them

```
<nuxt-link :to="'/posts/' + id" class="post-preview">
    <article>
      <div
        class="post-thumbnail"
        :style="{
          backgroundImage: `url(${thumbnail})`,
        }"
      ></div>
      <div class="post-content">
        <h1>{{ title }}</h1>
        <p>{{ previewText }}</p>
      </div>
    </article>
  </nuxt-link>
```

And pass them from the index page

```html
<PostPreview
  id="1"
  thumbnail="https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
  title="Hello there!"
  previewText="This is a preview of the post"
/>
```


