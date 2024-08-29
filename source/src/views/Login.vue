<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center mb-4">Login</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" v-model="email" id="email" placeholder="Enter email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" v-model="password" id="password" placeholder="Enter password" required>
          </div>
          <button type="submit" class="btn btn-primary mr-2">Login</button>
          <router-link to="/register" class="btn btn-link">Register</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      axios.post('http://localhost:8000/api/login', {
        email: this.email,
        password: this.password
      })
      .then(response => {
        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          this.$router.push({ name: 'product.list' });
        } else {
          alert('Invalid email or password');
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}

h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}
</style>