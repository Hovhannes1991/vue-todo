import Vue from 'vue'
import store from './store/index'
import App from './App.vue'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false


firebase.initializeApp({
  apiKey: "AIzaSyDINHtffaXf9QWFH-uXix9mmLvyiCJDmW8",
  authDomain: "todo-hk.firebaseapp.com",
  databaseURL: "https://todo-hk-default-rtdb.firebaseio.com",
  projectId: "todo-hk",
  storageBucket: "todo-hk.appspot.com",
  messagingSenderId: "299358594374",
  appId: "1:299358594374:web:21b9f70456049be1007147",
  measurementId: "G-R853ZPGZ9D"
});

var database = firebase.database();


new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')
