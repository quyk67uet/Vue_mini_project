<template>
  <div class="user-list">
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h2 class="display-4">User Management</h2>
      <p>
        <router-link to="/user/create">Add new</router-link>
      </p>
    </div>

    <div class="container">
      <div class="card-deck mb-3">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col" width="120">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="index" v-for="(user, index) in users">
              <th scope="row"> {{ user.id }}</th>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <router-link :to="{ name: 'user.edit', params: { id: user.id }}" class="btn btn-primary">Edit</router-link>
                &nbsp;
                <button class="btn btn-danger" @click="onDelete(user.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      users: []
    }
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.$request.get('http://localhost:8000/api/users').then(response => {
        this.users = response.data;
      });
    },
    onDelete(userId) {
      this.$swal.fire({
        title: "Do you want to delete?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Ok",
      }).then((result) => {
        if(result.isConfirmed) {
          this.$request.delete(`http://localhost:8000/api/users/${userId}`).then(response => {
            if(response.status === 200) {
              this.$swal.fire("Deleted!", '', "success");
              this.getUsers();
            }
          });
        }
      });
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 50px;
}

h2 {
  margin-bottom: 20px;
}

.table {
  margin-bottom: 0;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}
</style>