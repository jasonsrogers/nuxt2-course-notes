# Section 2: Pages, Routing & Views

Let's dive deeper into the different files and folders of a nuxt project. In this section we'll cover Pages, Routing & Views. The core of our applications and one of the main differences with vanilla Vue as it uses the folder and file structure to generate routes.

## From folders to Routes

In a normal view app you would have to define the routes in a file with something that looks like this:

```js
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeComponent,
  },
  {
    path: "/product/:id",
    name: "product",
    component: ProductComponent,
  },
];
```

This is then passed to vue router.

In Nuxt we don't have to do this. Nuxt will automatically generate routes based on the folder structure and the files inside of it. Let's take a look at the folder structure of a Nuxt project:

```
/Pages/
|- index.vue // -> /
|- /products/index.vue // -> /products
|- /products/_id/index.vue // -> /products/:id
...
```

Note it's possible to also name the file as the route you want to generate. For example `products.vue` will generate `/products`. We'll cover this later.

```
/Pages
|- users.vue // -> /users
```

is equivalent to

```
/Pages
|- /users/index.vue // -> /users
```

Ultimately, both approaches will generate the same route. Putting in folders will tend to be more scalable and easier to maintain as our url route will match our folder structure.

## Creating a Route with a Dynamic Path

Let's see how we can create a dynamic route for users where we specify the `id` of the users in the route

Again you can do it in a file or in a folder

http://localhost:3000/users/1

```
/Pages
|- /users/index.vue // -> /users
|- /users/_id.vue // -> /users/:id
```

is equivalent to

```
/Pages
|- /users/index.vue // -> /users
|- /users/_id/index.vue // -> /users/:id
```

Note: id can be anything as it's a string:

http://localhost:3000/users/anything

To access the routing param in the template, we can do:

```
<template>
  <h1>The page for User by id: {{ $route.params.id }}</h1>
</template>

```

Note: Nuxt uses the Vue router behind the scenes, so it's the same logic

Once again, both approaches will generate the same route. But if you nested routes under the dynamic route, you would have to use the folder approach.

## Adding Links & Navigating Around

We've been modifyig the url to navigate around, but now let's add links to navigate around.

Traditional links will work as expected:

```
  <div>
    <a href="/users">Users</a>
    <a href="/users/1">User 1</a>
    <a href="/users/anything">User anything</a>
  </div>
```

This will work, but it will always reload the page as it doesn't rely on the Vue router.

To use the Vue router, and therefore stay in the same page (SPA), if we were in vue we would use `<router-link>` component, in Nuxt we use `<nuxt-link>` component.

```
  <div>
    <nuxt-link to="/users">Users</nuxt-link>
    <nuxt-link to="/users/1">User 1</nuxt-link>
    <nuxt-link to="/users/anything">User anything</nuxt-link>
  </div>
```

And now we don't hit the server with every link click, we stay in the same page.

What if we want to navigate programmatically?

```
this.$router.push("/users/" + this.userId);
```

## Validating Parameters

In this section we'll see how we can validate the parameters of our routes but also dive into the difference between pages and components

`Components` are reusable pieces of code that can be used in different pages.

`Pages` are the actual pages of our application. They are pre-rendered on the server for the given route. They also have a bunch of special properties in the vue object on top of the regular vue properties (data, methods, mounted...).

For example route validation is only available in pages (with Nuxt).

```js
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
};
```

Validate that the id route param is a number, if not it will return a 404.

## Creating Nested Routes

How do we create a nested route? not a nested folder (which results in urls sections) but a section of a page that responds to a route without changing the outer layer.

At the same level as the `users` folder, create a `users.vue` file. this will be the parent page.

```
<template>
  <div>
    <h1>The Users Page</h1>
    <nuxt-child />
  </div>
</template>
```

This will be the parent page, and the `nuxt-child` component will be the nested route.

by default, the `nuxt-child` component will render the `index.vue` file inside the folder.

and then replace `nuxt-child` content with the nested route as we navigate.

## Layouts, Pages & Components

Lets take a look at the difference between layouts, pages and components.

`Layouts` are the outer layer of our application. They wrap the pages. They encupsulate the common elements of our application. For example the header, the footer, styling, etc.
(You can have multiple layouts, and multiple layouts for different sections of your application)

`Pages` are the actual pages of our application. They are pre-rendered on the server for the given route. They also have a bunch of special properties in the vue object on top of the regular vue properties (data, methods, mounted...). The can hold child pages and components.

`Components` are reusable pieces of vue code that can be used in different pages. They can hold child components.

## Adding a new Layout

