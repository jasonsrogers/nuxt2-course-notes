<template>
  <header class="header">
    <ul>
      <li><nuxt-link to="/">The Home Page</nuxt-link></li>
      <li><nuxt-link to="/users">Users</nuxt-link></li>
      <li><nuxt-link to="/products">Products</nuxt-link></li>
    </ul>
  </header>
</template>
<style scoped>
.header {
  width: 100%;
  height: 60px;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
ul {
  flex: 1;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

ul a {
  text-decoration: none;
  color: black;
}

ul a:hover,
ul a:active {
  color: white;
}
</style>
