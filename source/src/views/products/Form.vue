<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h2 class="text-center mb-4">Product Information</h2>
          <router-link to="/product" class="btn btn-link">Back</router-link>
          <form @submit.prevent="save()">
            <div class="form-group">
              <label for="productName">Product name</label>
              <input type="text" 
                  class="form-control" 
                  v-model="product.name"
                  @blur="validate()"
                  v-bind:class="{ 'is-invalid': errors.name }" 
                  id="productName" 
                  placeholder="Enter product name"/>
                  <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
            </div>
            <div class="form-group">
              <label for="productPrice">Product price</label>
              <input type="text" class="form-control" 
                    v-model="product.price"
                    @blur="validate()"
                    v-bind:class="{ 'is-invalid': errors.price }" 
                    id="productPrice" 
                    placeholder="Enter product price">
              <div class="invalid-feedback" v-if="errors.price">{{ errors.price }}</div>
            </div>
            <div class="form-group">
              <label for="productDescription">Product description</label>
              <textarea class="form-control" 
                    v-model="product.description" 
                    id="productDescription" rows="3" placeholder="Enter product description"
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
          name: 'ProductForm',
          data() {
              return {
                  errors: {
                    name: '',
                    price: '',
                    description: '' 
                  },

                  product: {
                    name: '',
                    price: '',
                    description: ''
                  }
              }
          },
          created() {
              let productId = this.$route.params.id;

              if(productId) {
                  this.getProduct(productId);
              }
          }, 
          methods: {
              validate() {
                  let isValid = true;

                  this.errors = {
                    name: '',
                    price: '',
                    description: ''
                  };

                  if (!this.product.name) {
                      this.errors.name = 'Product name is required';
                      isValid = false;
                  };

                  if (!this.product.price) {
                      this.errors.price = 'Product price is required';
                      isValid = false;
                  } else if (!this.isNumber(this.product.price)) {
                      this.errors.price = 'Product price must be a number';
                      isValid = false;
                  };

                  if (!this.product.description) {
                      this.errors.description = 'Product description is required';
                      isValid = false;
                  };

                  return isValid;
              },
              isNumber(value) {
                  return /^-?\d+$/.test(value);
              },

              save() {
                  if(this.validate()) {
                      if(this.product.id) {
                        this.$request.put(`http://localhost:8000/api/products/${this.product.id}`, this.product)
                          .then(response => {
                              this.$router.push({name: 'product.list'});
                              return;
                          })
                          .catch(error => {
                              console.log(error);
                          });
                      }
                      else {
                        this.$request.post('http://localhost:8000/api/products', this.product)
                          .then(response => {
                              this.$router.push({name: 'product.list'});
                          })
                          .catch(error => {
                              console.log(error);
                          });
                      }
                  }
              },
              getProduct(productId) {
                  this.$request.get(`http://localhost:8000/api/products/${productId}`)
                      .then(response => {
                          this.product = response.data;
                      })
                      .catch(error => {
                          console.log(error);
                      });
              },
              cancel() {
                  this.product.name = '';
                  this.product.price = ''; 
                  this.product.description = '';
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
  