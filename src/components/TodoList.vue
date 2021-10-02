<template>
  <div class="main_todo_container">
    <SvgForStyle />
    <div
      class="main"
      v-if="!loading && isAuth"
      :style="{ 'font-family': mainFont }"
    >
      <SearchAndFilter
        @setSearchText="setSearchText"
        @setFilterData="setFilterData"
      />
      <div class="new-todo-container">
        <label class="new-todo">
          <input
            type="text"
            class="new-todo-input"
            placeholder="new todo"
            v-model="newTodoText"
            @keydown.enter="addNewTodo"
          />
        </label>
        <div @click="addNewTodo" class="add_button">+</div>
      </div>

      <div class="todo-list">
        <div
          class="label_container"
          v-for="(todo, key) in todo_list"
          :key="key"
        >
          <label class="todo">
            <input
              type="checkbox"
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
            <div class="todo__text">
              <a v-if="url_regexp.test(todo.title)">{{ todo.title }}</a>
              <span v-else>{{ todo.title }}</span>
              <span
                v-if="hex_regexp.test(todo.title)"
                class="detectedHEX"
                :style="{ 'background-color': todo.title }"
              ></span>
            </div>
          </label>
          <img
            src="./../assets/delete.svg"
            alt="delete"
            title="Icons made by Pixelmeetup"
            class="delete-icon"
            @click="deleteTodo(key)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgForStyle from "./SvgForStyle";
import { mapGetters, mapActions } from "vuex";
import SearchAndFilter from "./SearchAndFilter";
export default {
  name: "TodoList",
  components: { SvgForStyle, SearchAndFilter },

  data() {
    return {
      newTodoText: "",
      hex_regexp: new RegExp(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/),
      url_regexp: new RegExp(
        /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/
      ),

      mainFont: "roboto",
      search_text: "",
      selected_filters: [],
    };
  },

  computed: {
    ...mapGetters(["todos", "loading", "isAuth"]),

    todo_list() {
      let todos = {};
      if (!this.search_text && !this.selected_filters.length) {
        return this.todos;
      } else if (this.search_text) {
        todos = this.search(this.todos, this.search_text);
      } else if (this.selected_filters.length) {
        todos = this.filter(this.todos, this.selected_filters);
      }
      return todos;
    },
  },

  methods: {
    ...mapActions(["fetchTodos", "toggleTodoStatus", "addTodo", "deleteTodo"]),

    addNewTodo() {
      if (this.newTodoText === "") return;
      let newTodo = {
        userId: 1, //?
        id: Date.now(),
        createdAt: Date.now(),
        title: this.newTodoText,
        completed: false,
        not_completed: true
      };
      this.addTodo(newTodo);
      this.newTodoText = "";
    },

    SelectFont(font) {
      this.mainFont = font;
    },

    setSearchText(text) {
      this.search_text = text;
    },

    setFilterData(data) {
      this.selected_filters = data;
    },

    search(list, text) {
      text = text.toLowerCase().trim();
      let new_list = {};
      for (let key in list) {
        let todo = list[key];
        if (todo.title.includes(text)) {
          new_list[key] = todo;
        }
      }
      return new_list;
    },

    filter(list, filters) {
      let filtred_list = {};
      for (let key in list) {
        let todo = list[key];
        if (
          filters.some((filter) => {              
            return todo[filter];            
          })
        ) {
          filtred_list[key] = todo;
        }
      }
      return filtred_list;
    },
  },
};
</script>

<style>
/* todolist */

.main_todo_container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.main {
  /* background: #fff; */
  font-size: 20px;
  width: 500px;
  margin: 150px auto;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
}

.todo-list {
  padding: 0.5em 1em;
  overflow-y: scroll;
  scrollbar-width: thin;
  height: 300px;
  max-height: 57vh;
  /* for scrollbar */
  margin-right: -7px;
  /* only firefox */
  scrollbar-color: #28313b var(--blue);
}

/* only Chrome Edge and Safary */
.todo-list::-webkit-scrollbar {
  width: 12px;               /* width of the entire scrollbar */
}

.todo-list::-webkit-scrollbar-track {
  background: var(--blue);        /* color of the tracking area */
}

.todo-list::-webkit-scrollbar-thumb {
  background-color: #28313b;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  /* border: 3px solid orange;  creates padding around scroll thumb */
}

.new-todo-container {
  display: grid;
  grid-template-columns: 1fr 70px;
  height: 70px;
  background: linear-gradient(274deg, #104758 0%, var(--blue) 100%);
}
.new-todo {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.add_button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: 50px;
  cursor: pointer;
  color: #fff;
  background: linear-gradient(274deg, #1ab188 0%, #c0e8cf 100%);
  margin: 10px;
  border-radius: 100%;
  font-family: serif;
}
.new-todo-input {
  /* font-family: "Dancing Script", cursive; */
  font-family: inherit;
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
  overflow-wrap: anywhere;
}
.todo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* position: relative; */
  padding: 1em 1em 1em 16%;
  cursor: pointer;
  /* font-family: "Lobster", cursive; */
  font-family: inherit;
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
  color: var(--blue);
  transition: all 0.4s linear;
  display: flex;
  align-items: center;
  gap: 10px;
}
.detectedHEX {
  width: 20px;
  height: 20px;
  border-radius: 100%;
}
.todo__icon {
  position: absolute;
  left: 0;
  width: 90%;
  fill: none;
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
  stroke: var(--blue);
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
  color: #108bb1;
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

@media only screen and (max-width: 580px) {
  .main {
    width: 90%;
  }
  .buttons {
    margin-bottom: 0;
  }
}
</style>
