<template>
  <div class="home">
    <h1>Welcome to Our Product Store</h1>
    <p>Discover the best products at unbeatable prices!</p>
    <img alt="Vue logo" src="../assets/logo.png" class="logo">
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 48px;
  margin-bottom: 20px;
  color: #2c3e50;
}

p {
  font-size: 18px;
  margin-bottom: 30px;
  color: #606060;
}

.logo {
  width: 150px;
  margin-bottom: 30px;
}
</style>