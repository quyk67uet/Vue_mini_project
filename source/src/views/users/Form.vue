<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h2 class="text-center mb-4">User Information</h2>
        <router-link to="/user" class="btn btn-link">Back</router-link>
        <form @submit.prevent="save()">
          <div class="form-group">
            <label for="userName">User name</label>
            <input type="text" 
                class="form-control" 
                v-model="user.name"
                @blur="validate()"
                v-bind:class="{ 'is-invalid': errors.name }" 
                id="userName" 
                placeholder="Enter user name"/>
                <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
          </div>
          <div class="form-group">
            <label for="userEmail">User email</label>
            <input type="text" class="form-control" 
                  v-model="user.email"
                  @blur="validate()"
                  v-bind:class="{ 'is-invalid': errors.email }" 
                  id="userEmail" 
                  placeholder="Enter user email">
            <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
          </div>
          <div class="form-group">
            <label for="userDescription">User description</label>
            <textarea class="form-control" 
                  v-model="user.description" 
                  id="userDescription" rows="3" placeholder="Enter user description"
                  @blur="validate()"
                  v-bind:class="{ 'is-invalid': errors.description }"
                  ></textarea>
            <div class="invalid-feedback" v-if="errors.description">{{ errors.description }}</div>
          </div>
          <button type="submit" class="btn btn-primary mr-2">Save</button>
          <button type="button" class="btn btn-danger" @click="cancel()">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserForm',
  data() {
    return {
      errors: {
        name: '',
        email: '',
        description: '' 
      },
      user: {
        name: '',
        email: '',
        description: ''
      }
    }
  },
  created() {
    let userId = this.$route.params.id;
    if(userId) {
      this.getUser(userId);
    }
  }, 
  methods: {
    validate() {
      let isValid = true;
      this.errors = {
        name: '',
        email: '',
        description: ''
      };
      if (!this.user.name) {
        this.errors.name = 'User name is required';
        isValid = false;
      };
      if (!this.user.email) {
        this.errors.email = 'User email is required';
        isValid = false;
      } else if (!this.isEmail(this.user.email)) {
        this.errors.email = 'User email must be a valid email';
        isValid = false;
      };
      if (!this.user.description) {
        this.errors.description = 'User description is required';
        isValid = false;
      };
      return isValid;
    },
    isEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    },
    save() {
      if(this.validate()) {
        if(this.user.id) {
          this.$request.put(`http://localhost:8000/api/users/${this.user.id}`, this.user)
            .then(response => {
              this.$router.push({name: 'user.list'});
              return;
            })
            .catch(error => {
              console.log(error);
            });
        }
        else {
          this.$request.post('http://localhost:8000/api/users', this.user)
            .then(response => {
              this.$router.push({name: 'user.list'});
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    },
    getUser(userId) {
      this.$request.get(`http://localhost:8000/api/users/${userId}`)
        .then(response => {
          this.user = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    cancel() {
      this.user.name = '';
      this.user.email = ''; 
      this.user.description = '';
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

.form-group {
  margin-bottom: 20px;
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