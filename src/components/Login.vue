<template>
  <div class="login-page">
    <img class="logo" src="../assets/KiboLogo.png">
    <div v-if="loginError" v-text="loginError" class="form-error"></div>
    <div class="input-container">
      <input v-model="email" type="email" placeholder="email" novalidate>
      <div class="input-error" v-if="emailError" v-text="emailError"></div>
    </div>
    <div class="input-container">
      <input v-model="password" type="password" placeholder="password">
      <div class="input-error" v-if="passwordError" v-text="passwordError"></div>
    </div>
    <button class="login-button" @click="login">Login</button>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      loginError: null,
      emailError: null,
      passwordError: null,
      apiBase: 'https://obscure-bayou-43244.herokuapp.com/api'
    }
  },
  methods: {
    login() {
      let error = false;

      if (this.email === '') {
        this.emailError = 'Email cannot be empty';
        error = true;
      }

      if (this.password === '') {
        this.passwordError = 'Password cannot be empty';
        error = true;
      }

      if (error) {
        return;
      } else {
        this.emailError = null
        this.passwordError = null
        this.loginError = null

        axios.post(this.apiBase + '/login', {
          email: this.email,
          password: this.password
        })
        .then((res) => {
          localStorage.setItem('token', res.data.data.token)
          localStorage.setItem('name', res.data.data.name)
          localStorage.setItem('profileImage', res.data.data.image)

          this.$router.push('/')
        })
        .catch((error) => {
          this.loginError = 'Invalid credentials'
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo {
  height: 200px;
}

input {
  transition: all .2s ease;
  border: 1px solid #CCC;
  padding-left: 8px;
  width: 300px;
  font-size: 18px;
  height: 45px;
}

input:focus {
  outline: none;
  border: 1px solid blue;
}

.input-container {
  margin-bottom: 25px;
}

.input-error {
  color: red;
  font-size: 14px;
  margin-top: 4px;
  text-align: left;
}

.form-error {
  color: red;
  font-size: 18px;
  margin-bottom: 25px;
}

.login-button {
  border: 1px solid #CCC;
  width: 300px;
  padding: 0;
  font-size: 18px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
