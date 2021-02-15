<template>
  <div>
    <div id="app">      
      <Loading v-if="loading"/>
      <LoginSignup v-else-if="!isAuth" />      
      <div v-else>
        <SvgForStyle />
        <div class="logout_button_container">   
          <div>
            {{ userData.displayName }}
            <input id="logout" type="button" value="Log Out" @click="logOut" />
          </div>
        </div>
        <div class="main" v-if="!loading && isAuth">
          <label class="new-todo">
            <input
              type="text"
              class="new-todo-input"
              placeholder="new todo"
              v-model="newTodoText"
              @keydown.enter="addNewTodo"
            />
          </label>

          <div class="todo-list">
            <div
              class="label_container"
              v-for="(todo, key) in todos"
              :key="key"
            >
              <label class="todo">
                <input
                  class="todo__state"
                  :class="{ todo__state_done: todo.completed }"
                  @click="toggleTodoStatus(key)"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 200 25"
                  class="todo__icon"
                >
                  <use xlink:href="#todo__line" class="todo__line"></use>
                  <use xlink:href="#todo__box" class="todo__box"></use>
                  <use xlink:href="#todo__check" class="todo__check"></use>
                  <use xlink:href="#todo__circle" class="todo__circle"></use>
                </svg>
                <div class="todo__text">{{ todo.title }}</div>
              </label>
              <img
                src="./assets/delete.svg"
                alt="delete"
                title="Icons made by Pixelmeetup"
                class="delete-icon"
                @click="deleteTodo(key)"
              />
            </div>
          </div>
        </div>
      </div>
      <VideoBackground />
      <div class="design_author">
        <p>
          I got base design from
          <a href="https://codepen.io/shshaw/pen/WXMdwE" target="_blank"
            >here</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import LoginSignup from "./components/LoginSignup";
import SvgForStyle from "./components/SvgForStyle";
import VideoBackground from "./components/VideoBackground";
import Loading from "./components/Loading"
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: { LoginSignup, SvgForStyle, VideoBackground, Loading },

  data() {
    return {
      newTodoText: "",
    };
  },

  computed: mapGetters(["todos", "loading", "isAuth", "userData"]),

  methods: {
    ...mapActions(["authStateChange", "fetchLogOut", "fetchTodos", "toggleTodoStatus", "addTodo", "deleteTodo"]),

    logOut() {
      this.fetchLogOut();   
    },

    addNewTodo() {
      if (this.newTodoText === "") return;
      let newTodo = {
        userId: 1,
        id: Date.now(),
        title: this.newTodoText,
        completed: false,
      };
      this.addTodo(newTodo);
      this.newTodoText = "";
    },
  },

  async mounted() {    
    firebase.auth().onAuthStateChanged((user) => {
        this.authStateChange(user);        
      }); 
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100%;
  /* padding-top: 20%; */
  /* background-image: url('assets/landscape.webp');
  background-repeat: no-repeat;
  background-size: cover; */
}

.main {
  background: #fff;
  font-size: 20px;
  max-width: 500px;
  margin: auto;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
}

.todo-list {
  padding: 0.5em 1em;
}
.new-todo {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 70px;
  background: linear-gradient(#0fc0f5, #27fdc7);
}
.new-todo-input {
  font-family: "Dancing Script", cursive;
  width: 90%;
  height: 40px;
  border: none;
  outline: none;
  font-size: 1.5em;
  color: #fff;
  background: none;
}
.label_container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-bottom: solid 1px #ddd;
}
.todo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* position: relative; */
  padding: 1em 1em 1em 16%;
  cursor: pointer;
  font-family: "Lobster", cursive;
}
.todo:last-child {
  border-bottom: none;
}
.delete-icon {
  /* position: absolute; */
  right: 10px;
  width: 40px;
  cursor: pointer;
}
.todo__state {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
.todo__text {
  color: #135156;
  transition: all 0.4s linear;
}
.todo__icon {
  position: absolute;
  left: 0;
  width: 90%;
  fill: none;
  stroke: #27fdc7;
  stroke-width: 2;
  stroke-linejoin: round;
  stroke-linecap: round;
}
.todo__line,
.todo__box,
.todo__check {
  transition: stroke-dashoffset 0.4s cubic-bezier(0.9, 0, 0.5, 1);
}
.todo__circle {
  stroke: #27fdc7;
  stroke-dasharray: 1 6;
  stroke-width: 0;
  transform-origin: 13.5px 12.5px;
  transform: scale(0.4) rotate(0deg);
  animation: none 0.8s linear;
}
@keyframes explode {
  30% {
    stroke-width: 3;
    stroke-opacity: 1;
    transform: scale(0.8) rotate(40deg);
  }
  100% {
    stroke-width: 0;
    stroke-opacity: 0;
    transform: scale(1.1) rotate(60deg);
  }
}
.todo__box {
  stroke-dasharray: 56.1053, 56.1053;
  stroke-dashoffset: 0;
  transition-delay: 0.16s;
}
.todo__check {
  stroke: #27fdc7;
  stroke-dasharray: 9.8995, 9.8995;
  stroke-dashoffset: 9.8995;
  transition-duration: 0.32s;
}
.todo__line {
  stroke-dasharray: 168, 1684;
  stroke-dashoffset: 168;
}
.todo__circle {
  animation-delay: 0.56s;
  animation-duration: 0.56s;
}
.todo__state_done ~ .todo__text {
  transition-delay: 0s;
  color: #5ebec1;
  opacity: 0.6;
}
.todo__state_done ~ .todo__icon .todo__box {
  stroke-dashoffset: 56.1053;
  transition-delay: 0s;
}
.todo__state_done ~ .todo__icon .todo__line {
  stroke-dashoffset: -8;
}
.todo__state_done ~ .todo__icon .todo__check {
  stroke-dashoffset: 0;
  transition-delay: 0.48s;
}
.todo__state_done ~ .todo__icon .todo__circle {
  animation-name: explode;
}
html {
  background: #ddd;
}
html {
  height: 100%;
  display: flex;
}
body {
  width: 100%;
  margin: auto;
}

.design_author {
  position: fixed;
  color: #fff;
  font-size: 24px;
  left: 20px;
  bottom: 20px;
}
.design_author a {
  color: #fff;
  text-decoration: none;
  font-style: italic;
}


.logout_button_container {
  position: fixed;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
