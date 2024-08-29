<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center mb-4">Register</h2>
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" v-model="name" id="name" placeholder="Enter name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" v-model="email" id="email" placeholder="Enter email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" v-model="password" id="password" placeholder="Enter password" required>
          </div>
          <button type="submit" class="btn btn-primary mr-2">Register</button>
          <router-link to="/login" class="btn btn-link">Login</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    register() {
      axios.post('http://localhost:8000/api/register', {
        name: this.name,
        email: this.email,
        password: this.password
      })
      .then(response => {
        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          this.$router.push({ name: 'product.list' });
        } else {
          alert('Registration failed');
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