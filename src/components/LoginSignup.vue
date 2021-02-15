<template>
  <div class="main_container">
    <div class="buttons">
      <div :class="loginOrSignup === 'login' ? 'toggle toggle_active' : 'toggle'" @click="toggleLoginSignup('login')">
        Log In
      </div>
      <div :class="loginOrSignup === 'signup' ? 'toggle toggle_active' : 'toggle'" @click="toggleLoginSignup('signup')">
        Sign Up
      </div>
    </div>
    <div class="login_blok" @keydown.enter="formSubmit">
      <input
        :class="loginOrSignup == 'login' ? 'hidden_input' : ''"
        type="text"
        placeholder="name"
        v-model="user.name"
        @input="validateInput('name')"
      />
      <div v-if="loginOrSignupError.type === 'name'" class="error_message">{{ loginOrSignupError.message }}</div>
      <input type="text" placeholder="email" v-model="user.email" @input="validateInput('email')"/>
      <div v-if="loginOrSignupError.type === 'email'" class="error_message">{{ loginOrSignupError.message }}</div>
      <input type="password" placeholder="password" v-model="user.password" @input="validateInput('password')"/>
      <div v-if="loginOrSignupError.type === 'password'" class="error_message">{{ loginOrSignupError.message }}</div>
      <div v-if="loginOrSignup == 'login'" class="login_btn" @click="login">Log In</div>
      <div v-if="loginOrSignup == 'signup'" class="login_btn" @click="signup">Sign Up</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "LoginSignup",
  data() {
    return {
      loginOrSignup: "login",
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },

  computed:{
      ...mapGetters(['loginOrSignupError']),
  },

  methods: {      
    ...mapActions(["fetchLogin","fetchSignUp", "removeLoginOrSignupError"]),

    toggleLoginSignup(value) {
      this.loginOrSignup = value;
      this.user.name = '';
      this.user.email = '';
      this.user.password = '';
      this.removeLoginOrSignupError();     
    },

    formSubmit(){
      if(this.loginOrSignup == 'login'){
        this.login();
      }
      else if(this.loginOrSignup == 'signup'){
        this.signup();
      }
    },

    login() {
      this.fetchLogin({login: this.user.email, pass: this.user.password});
    },

    signup() {
      if(this.user.name.length < 4 || this.user.name.length > 20){
        this.loginOrSignupError.type = 'name';
        this.loginOrSignupError.message = 'Name length should be 4 to 20.';
        return;
      }
      this.fetchSignUp({name: this.user.name, login: this.user.email, pass: this.user.password});
    },

    validateInput(input_field){      
      if(this.loginOrSignupError.message){
        if(input_field === this.loginOrSignupError.type){
          this.removeLoginOrSignupError();
        }
      }
    }
  },
};
</script>

<style lang="css" scoped>
* {
  box-sizing: border-box;
}

.main_container {
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 200px auto;
  padding: 50px;
  background-color: #13232f;
  border-radius: 15px;
  box-shadow: 0px 0px 20px 5px #1ab188;
}

.buttons {
  display: flex;
  /* margin: 50px 50px 20px 50px; */
  margin-bottom: 20px;
  height: 70px;
}

.toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  background-color: #1c4857;
  font-size: 28px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.5s linear;
}

.toggle_active {
  background-color: #1ab188;
}

.login_blok {
  display: flex;
  flex-direction: column;
  /* padding: 0 50px; */
}

input {
  width: 100%;
  border: none;
  outline: none;
  height: 40px;
  margin-top: 20px;
  background-color: #1c4857;
  border-radius: 10px;
  padding: 0 10px;
  font-size: 24px;
  color: #fff;
  transition: all 0.5s linear;
}

.hidden_input {
  opacity: 0;
  height: 0;
}

.login_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 45px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #1ab188;
  color: #fff;
  font-size: 28px;
  cursor: pointer;
}

.error_message {
    color: red;
    /* padding: 0; */
    /* margin: 0;    */
    /* height: 20px; */
    font-size: 14px;
    display: flex;
    align-items: center;
    /* justify-content: center; */
}
</style>
