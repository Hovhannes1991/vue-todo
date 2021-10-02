<template>
  <div id="app">
    <Header @selectFont="SelectFont" />
    <Loading v-if="loading" />
    <LoginSignup v-else-if="!isAuth" />
    <TodoList ref="todo_list" v-else />
  </div>
</template>

<script>
import firebase from "firebase/app";
import Header from "./components/Header.vue";
import LoginSignup from "./components/LoginSignup";

import Loading from "./components/Loading";
import TodoList from "./components/TodoList.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: { Header, LoginSignup, TodoList, Loading },

  data() {
    return {};
  },

  computed: {
    ...mapGetters(["todos", "loading", "isAuth"]),
  },

  methods: {
    ...mapActions(["authStateChange"]),

    SelectFont(font) {
      this.$refs.todo_list.SelectFont(font);
    },
  },

  async created() {
    console.log(
      `%c  Armenia  `,
      `color: white; background: linear-gradient(red, red 33.3%,blue 33.3%, blue 66.7%, orange 66.7%, orange 100%); font-size: 50px`
    );

    firebase.auth().onAuthStateChanged((user) => {
      this.authStateChange(user);
    });
  },
};
</script>

<style>
:root {
  --blue: #0fc0f5;
}

html {
  height: 100%;
  display: flex;
  /* overflow-y: overlay; */
}
body {
  width: 100%;
  margin: auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-image: linear-gradient(315deg, #485461 0%, #28313b 74%);
}
</style>
