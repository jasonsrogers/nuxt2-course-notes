# Section 1: Getting Started

## What is Nuxt.js?

First what is Vue.js? 

Is a powerful framework for building web apps. It's a progressive framework, meaning that you can start with a small project and scale it up to a large project. It takes inspiration from AngularJS and React. You can build UI widgets or complete single-page-applications (SPA).

It's a complete framework that includes routing and state management. It's very lightweight which makes it very popular.

Nuxt is not a new framework, it builds on top of Vue.js. It mainly makes it easier to develop applications

One of the core feature is allowing creation of universal apps by making it easy to create server-side rendered (SSR) applications. (aka building the page on the server side and sending it to the client)

It has a configuration via file and folder structure approach. (for example, routes defined based on the folder structure).

## Understanding server-side rendering

What does server-side rendering mean? 

Nuxt.js is not a server side rendering framework, it's a framework that makes it easy to create server-side rendered applications.

In a client-side rendered application, the server sends a blank HTML page to the client. The client then downloads the JavaScript bundle and renders the page. The JavaScript bundle then makes API calls to get the data and renders the page.

This is not ideal for SEO because the search engine crawlers don't execute JavaScript. So the search engine crawlers will see a blank page. Also you're user has to wait for the JavaScript bundle to download and execute before they see the page.

Nuxt.js makes it easy to create server-side rendered applications. The server will render the page and send it to the client. The client will then download the JavaScript bundle and hydrate the page. This means that the JavaScript bundle will take over the page and make it interactive. We'll still have only one html download, but that initial page will be rendered on the server.

## Nuxt vs "Normal" Server-Side Rendering

You can already create SSR applications with Vue.js without using nuxt. There is a lengthy guide on how to do this and you'll get there eventually. But Nuxt makes it easier to create SSR applications.

You create a Nuxt project and you already have SSR setup, it's easier, highly optimized, lots of behind the scenes optimizations, easier configuration, etc.

## Creating our first nuxt app

Follow [official instructions](https://v2.nuxt.com/docs/get-started/installation)

`npm init nuxt-app@latest <my-project>`

## Understanding the folder structure

Overview of the folder structure

- assets: static assets like images, fonts, etc.
- components: reusable components
- layouts: the layout of the app (header, footer, etc.)
- middleware: functions that run before the page is rendered
- pages: the pages of the app
- plugins: plugins that run before the Vue instance is created
- static: static files like robots.txt, favicon.ico, etc. (should not be handled by webpack)
- store: vuex store files
- then config files about git/nuxt

Nuxt is all about configuring the project through folders and files. We have a config file, but most of the setup is done by the folder structure and naming conventions.

Pages: 
files in pages have to be vue files, they'll be interpreted as routes that the user can visit. 
`localhost:3000/` will map to `pages/index.vue`

In dev mode, it will watch for changes and hot reload the page.

If you inspect the source of the page, you'll see the elements of the first page in the html. This is because it's server-side rendered. (in a client-side rendered app, you'll only see the root div)

If I add a `users.vue` file in the pages folder, it will be available at `localhost:3000/users`

## What can we build with Nuxt?

You can build:

- Universal app
First view is rendered dynamically on the server
After this load, application turns into SPA
Great for SEO (Search Engine Optimization)
It will give a impression of faster load to the user

- Single page app
no server side rendering, it would give you a normal vue application but with the extra tools, structure and config of nuxt.
App starts (in client) after first load
App stays SPA
Like a normal Vue App but simplified development

- Static app
Pre-rendered views are loaded (node need for node)
After first load, application turns into SPA
Downside, you have to rerender the pages if your content changes.
Great for SEO

## What's inside this course

- getting started
- pages, views & routing
- building a real project
- handling data & vuex
- fetching & storing data (via http)
- nuxt config, pluging & modules
- middleware & authentication
- server-side integration
- deployment (building in different mode



