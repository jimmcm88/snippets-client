<template>
  
  <div class="container mx-auto px-6 mt-16">
    
    <div class="flex flex-col items-center">
      <h1 class="text-3xl text-gray-700 font-medium mb-10">
        Register.
      </h1>

      <form @submit.prevent="submit" class="bg-white rounded p-8 mb-4 w-full md:w-3/4 lg:w-1/2">

        <div class="flex flex-wrap lg:flex-nowrap">
          <div class="mb-6 w-full lg:mr-6 lg:w-1/2">
            <label 
              for="name" 
              class="block text-gray-600 font-medium mb-2" 
              :class="{
                'text-red-500': validation.name
              }"
            >
              Name
            </label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              v-model="form.name" 
              class="border border-gray-400 rounded block w-full p-3 focus:outline-none"
              :class="{
                'border-red-500': validation.name
              }"
            >
            <div v-if="validation.name" class="text-sm text-red-500 mt-1 mb-4">
              {{validation.name[0]}}
            </div>
          </div>

          <div class="mb-6 w-full lg:w-1/2">
            <label 
              for="username" 
              class="block text-gray-600 font-medium mb-2" 
              :class="{
                'text-red-500': validation.username
              }"
            >
              Username
            </label>
            <input 
              type="text" 
              name="username" 
              id="username" 
              v-model="form.username" 
              class="border border-gray-400 rounded block w-full p-3 focus:outline-none"
              :class="{
                'border-red-500': validation.username
              }"
            >
            <div v-if="validation.username" class="text-sm text-red-500 mt-1 mb-4">
              {{validation.username[0]}}
            </div>
          </div>
        </div>
        
        <div class="mb-6">
          <label 
            for="email" 
            class="block text-gray-600 font-medium mb-2" 
            :class="{
              'text-red-500': validation.email
            }"
          >
            Email
          </label>
          <input 
            type="text" 
            name="email" 
            id="email" 
            v-model="form.email" 
            class="border border-gray-400 rounded block w-full p-3 focus:outline-none"
            :class="{
              'border-red-500': validation.email
            }"
          >
          <div v-if="validation.email" class="text-sm text-red-500 mt-1 mb-4">
            {{validation.email[0]}}
          </div>
        </div>

        <div class="flex flex-wrap lg:flex-nowrap">

          <div class="mb-6 w-full lg:mr-6 lg:w-1/2">
            <label 
              for="password" 
              class="block text-gray-600 font-medium mb-2"
              :class="{
                'text-red-500': validation.password
              }"
            >
              Password
            </label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              v-model="form.password" 
              class="border border-gray-400 rounded block w-full p-3 focus:outline-none"
              :class="{
                'border-red-500': validation.password
              }"  
            >

            <div v-if="validation.password" class="text-sm text-red-500 mt-1 mb-4">
              {{validation.password[0]}}
            </div>
          </div>

          <div class="mb-6 w-full lg:w-1/2">
            <label 
              for="password_confirmation" 
              class="block text-gray-600 font-medium mb-2"
              :class="{
                'text-red-500': validation.password_confirmation
              }"
            >
              Confirm password
            </label>
            <input 
              type="password" 
              name="password_confirmation" 
              id="password_confirmation" 
              v-model="form.password_confirmation" 
              class="border border-gray-400 rounded block w-full p-3 focus:outline-none"
              :class="{
                'border-red-500': validation.password_confirmation
              }"  
            >

            <div v-if="validation.password_confirmation" class="text-sm text-red-500 mt-1 mb-4">
              {{validation.password_confirmation[0]}}
            </div>
          </div>
        </div>
        <button type="submit" class="p-4 rounded bg-blue-500 text-white block w-full">
          Register
        </button>
      </form>
    </div>
    
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          username: '',
          email: '',
          password: '',  
          password_confirmation: '',  
        },
        validation: {}
      }
    },

    methods: {
      async submit() {
        try {
          await this.$axios.$post('auth/register', this.form)  

          await this.$auth.loginWith('local', {
            data: {
              email: this.form.email,
              password: this.form.password
            }
          });
        } catch(e) {
          if(e.response.status === 422) {
            this.validation = e.response.data.errors;
          }
        }
      }
    }
  }
</script>