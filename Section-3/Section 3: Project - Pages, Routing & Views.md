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

## Adding static assets - the background image

Let's now work on the background image, we'll add it as a static asset folder

Most of the time images will be loaded from a server where the asset is stored in something like an S3 bucket. But some images will always be the same and we can add them to our project

Let's create a folder called `static` and inside it a folder called `images` and add the image there

Note: `images` is not necessary, but it's a good practice to keep things organized

Then we can use it in our component

```html
background-image: url("~assets/images/main-page-background.jpg");
```

`~` refers to the root folder (note: no `/`)

And that it, webpack will take care of the rest and include the used assets in the build

## Adding the Header Component

Let's add a Navigation folder in `components` and create:

- TheHeder.vue
- TheSideNav.vue
- TheSideNavToggle.vue

Now lets add the header to our layout as it will be used in all pages

Import it

```
<script>
import TheHeader from "@/components/Navigation/TheHeader";
import TheSidenav from "@/components/Navigation/TheSidenav";

export default {
  name: "DefaultLayout",
  components: {
    TheHeader,
    TheSidenav,
  },
  data() {
    return {
      displaySidenav: false,
    };
  },
};
</script>
```

Use it

```html
<TheHeader @sidenavToggle="displaySidenav = !displaySidenav" />
<TheSidenav :show="displaySidenav" @close="displaySidenav = false" />
```

## Vue Router vs Nuxt Router

In our example, the links of the section we are visiting are highlighted. 

```
.nav-item a:hover,
.nav-item a:active,
.nav-item a.nuxt-link-active {
  color: red;
}
```

As long as our url matches the folder structure, the link will be highlighted.

The marking of active is actually a vue router feature. The NuxtRouter is just a wrapper around the VueRouter which means we can use all the features of the VueRouter but call in NuxtRouter.

## Working on the Post Page

We'll reuse the PostPreview component and wrap it into a PostList component to share with the index page

## Creating an admin section

we're going to create 

admin
- index
- id/
- - index
- auth
- - index
- new-post
- - index

