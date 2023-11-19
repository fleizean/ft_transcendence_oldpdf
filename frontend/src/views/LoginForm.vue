<template>
  <div id="app">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>
      
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>

      <button type="submit">Login</button>
    </form>
    
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginForm', // Bileşen adınızı değiştirin
  data() {
    return {
      email: '',
      password: '',
      message: ''
    };
  },
  methods: {
    login() {
      // Axios ile API'ye istek gönderme
      axios.post('http://localhost:3000/api/auth/login', {
        email: this.email,
        password: this.password
      })
      .then(response => {
        // Başarılı cevap durumu kontrolü
        if (response.status === 200) {
          this.message = 'Giriş başarılı!';
        } else {
          this.message = 'Giriş başarısız. Hata kodu: ' + response.status;
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
