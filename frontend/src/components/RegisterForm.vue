<template>
  <div id="app">
    <h2>Register</h2>
    <router-link to="/login"><h2>Login</h2></router-link>
    <form @submit.prevent="register">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>
      
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>

      <label for="firstname">Firstname:</label>
      <input type="text" id="firstname" v-model="firstname" required>

      <label for="lastname">Lastname:</label>
      <input type="text" id="lastname" v-model="lastname" required>

      <label for="nickname">Nickname:</label>
      <input type="text" id="nickname" v-model="nickname" required>

      <button type="submit">Register</button>
    </form>
    
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterForm',
  data() {
    return {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      nickname: '',
      message: ''
    };
  },
  methods: {
    register() {
      // Axios ile API'ye istek gönderme
      axios.post('http://localhost:3000/api/auth/register', {
        email: this.email,
        password: this.password,
        firstName: this.firstname,
        lastName: this.lastname,
        nickName: this.nickname
      })
      .then(response => {
        // Başarılı cevap durumu kontrolü
        if (response.status === 200) {
          this.message = 'Kayıt başarılı!';
        } else {
          this.message = 'Kayıt başarısız. Hata kodu: ' + response.status;
        }
      })
      .catch(error => {
        // Hata durumu kontrolü
        this.message = 'Bir hata oluştu: ' + error.message;
      });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
}

label {
  margin-bottom: 8px;
}

input {
  margin-bottom: 16px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
