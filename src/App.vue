<template>
  <div id="app" class="container">
    <ul class="nav nav-pills justify-content-end mt-2 mb-4">
      <li class="nav-item">
        <router-link class="nav-link" exact to="/" active-class="active"
          >POSTS</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/todos" active-class="active"
          >TODOS</router-link
        >
      </li>
    </ul>

    <router-view />
  </div>
</template>

<style scoped>
li {
  padding-right: 3rem;
}
</style>
