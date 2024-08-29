<template>
  <div id="app">
    <nav class="navbar">
      <div class="logo">
        <router-link to="/home">Vue Mini Project</router-link>
      </div>
      <div class="nav-links">
        <router-link to="/product">Product management</router-link>
        <router-link to="/user">User management</router-link>
        <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
        <router-link v-if="!isAuthenticated" to="/register">Register</router-link>
        <router-link v-if="isAdmin" to="/admin">Admin</router-link>
        <button v-if="isAuthenticated" @click="logout" class="admin-btn">Logout</button>
      </div>
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: false,
      isAdmin: false
    };
  },
  created() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem('token');
      this.isAuthenticated = !!token;
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.isAdmin = payload.role === 'admin';
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.isAuthenticated = false;
      this.isAdmin = false;
      this.$router.push('/login');
    }
  },
  watch: {
    '$route'() {
      this.checkAuth();
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f9fa;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

.nav-links a.router-link-exact-active {
  color: #42b983;
}

.admin-btn {
  background-color: white;
  border: 1px solid #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.admin-btn:hover {
  background-color: #f0f0f0;
}

main {
  padding: 20px;
}

h1 {
  font-size: 36px;
  margin-bottom: 20px;
}

.add-new {
  color: #42b983;
  text-decoration: none;
  margin-bottom: 20px;
  display: inline-block;
}

table {
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
}

table th, table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

table th {
  background-color: #f8f9fa;
}

p {
  margin-top: 40px;
  font-size: 18px;
}
</style>