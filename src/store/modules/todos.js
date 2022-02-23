import firebase from 'firebase/compat/app';
import "firebase/compat/database";
export default {
  state: () => ({
    isAuth: false,
    user: {
      uid: '',
      displayName: ''
    },
    todos: [],
    loading: true,
    loginOrSignupError: {
      message: '',
      type: ''
    }
  }),

  getters: {
    todos(state) {
      return state.todos;
    },

    isAuth(state) {
      return state.isAuth;
    },

    userData(state) {
      return state.user
    },

    loading(state) {
      return state.loading;
    },

    loginOrSignupError(state){
      return state.loginOrSignupError;
    }
  },


  actions: {
    async authStateChange(ctx, user) {
      if (user) {
        await ctx.commit("authStateChange", user);
        let db = firebase.database().ref("users/" + user.uid);        
        db.on("value", (snapshot) => {
          const data = snapshot.val();
          let newTodos = {};
          for (let key in data) {                 
            newTodos[key] = data[key];
          }         
          ctx.commit("setTodos", newTodos);
        });
      }
      else {
        ctx.commit('logout');        
      }
    },

    async fetchLogin(ctx, payload) {       
      try {
        await firebase.auth().signInWithEmailAndPassword(payload.login, payload.pass)
        .then((user) => {
         ctx.commit('setLoadingStatus', true);
         ctx.commit('removeLoginOrSignupError');
        })
      } catch (err) {
        console.error(err.message)
        let errType = err.code.includes('email') ? 'email' : 'password';
        ctx.commit('loginOrSignupError', {type: errType, message: err.message});
      }
      // finally{
      //   ctx.commit('setLoadingStatus', false)
      // }
    },

    async fetchLogOut(ctx) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          ctx.commit("logout");
          ctx.commit('removeLoginOrSignupError');
        })
        .catch((err) => console.error(err.message));
    },

    async fetchSignUp(ctx, payload) {      
      try {
        await firebase.auth().createUserWithEmailAndPassword(payload.login, payload.pass)
        .then((user) => {
          ctx.commit('setLoadingStatus', true);
          let db = firebase.database();
          db.ref("users/" + user.user.uid).push({
            id: Date.now(),
            title: "Your first ToDo",
            completed: false,
          });
        })
        .then(async () => {          
          await firebase.auth().currentUser.updateProfile({
            displayName: payload.name
            // photoURL: "https://example.com/jane-q-user/profile.jpg"
          })
          let displayName = await firebase.auth().currentUser.displayName;
          ctx.commit('setUserDetails', {displayName: displayName})       
        })
      } catch (err) {
        console.log(err)      
        let errType = err.code.includes('email') ? 'email' : 'password';
        ctx.commit('loginOrSignupError', {type: errType, message: err.message});
      }      
    },

    addTodo(ctx, newTodo) {
      ctx.commit("addTodo", newTodo);
    },

    deleteTodo(ctx, key) {
      ctx.commit("deleteTodo", key);
    },

    toggleTodoStatus(ctx, key) {
      ctx.commit("toggleTodoStatus", key);
    },

    removeLoginOrSignupError(ctx){
      ctx.commit('removeLoginOrSignupError')
    }
  },

  mutations: {
    authStateChange(state, user) {      
      if (user) {
        state.isAuth = true;        
        state.user.uid = user.uid;
        state.user.displayName = user.displayName;
      } else {
        state.isAuth = false;
        state.user.uid = "";
        state.user.displayName = "";
      }
    },

    setTodos(state, newTodos) {
      state.todos = newTodos;
      state.loading = false;
    },

    updateTodos(state, todos) {
      state.todos = todos;
    },

    addTodo(state, newTodo) {      
      let db = firebase.database();      
      db.ref("users/" + state.user.uid).push(newTodo);
    },

    deleteTodo(state, key) {
      let todoRef = firebase.database().ref('users/' + state.user.uid + '/' + key);
      todoRef.remove()      
    },

    async toggleTodoStatus(state, key) {
      // for(let i = 0; i < state.todos.length; i++){
      //   if(state.todos[i] === todo){
      //     state.todos[i].completed = !state.todos[i].completed;
      //   }
      // }
      let todoRef = firebase.database().ref('users/' + state.user.uid + '/' + key);
      let completed;
      todoRef.on('value', (snapshot) => {
      // fix error "Cannot read property 'completed' of null"
        if(snapshot.val && snapshot.val()){
          completed = snapshot.val().completed;
        }
      });    
      todoRef.update({completed: !completed, not_completed: completed})
    },

    logout(state){      
      state.loading = false;
      state.isAuth = false;
      state.user =  {
        uid: '',
        displayName: ''
      }
    },

    loginOrSignupError(state, {type, message}){
      state.loginOrSignupError.type = type;
      state.loginOrSignupError.message = message;      
    },
    removeLoginOrSignupError(state){
      state.loginOrSignupError.type = '';
      state.loginOrSignupError.message = '';
    },

    setUserDetails(state, userDetails) {
      // for(let key in userDetails){
      //   Vue.set(state.user, key, userDetails[key])
      //   state.user[key] = userDetails[key];
      //   console.log(state);        
      // }
      state.user.displayName = userDetails.displayName;
    },

    setLoadingStatus(state, loadingStatus){
      state.loading = loadingStatus;
    }
  }
};
