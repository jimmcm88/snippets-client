<template>
  <div class="bg-white flex items-center py-3 lg:py-0">
    <div class="container px-6 lg:px-0 mx-auto flex flex-wrap lg:flex-nowrap lg:items-center">
      <nuxt-link 
        :to="{ name: 'index'}"
        class="mr-10 flex-shrink-0"
      >
        Home
      </nuxt-link>

      <button @click="mobileNavOpen = !mobileNavOpen" 
              class="focus:outline-none lg:hidden ml-auto text-2xl">
        <span v-if="!mobileNavOpen">&#9776;</span>
        <span v-if="mobileNavOpen">&#10005;</span>
      </button>

      <div class="w-full flex lg:items-center justify-between" 
          :class="{
            'mt-8': mobileNavOpen,
            'hidden lg:flex' : !mobileNavOpen 
          }"
      > 
        <ul class="lg:flex items-center lg:h-16 lg:w-auto">
          <li>
            <nuxt-link 
              :to="{ name: 'index' }"
              class="text-lg lg:py-5 lg:px-3"
            >
              Browse
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{name: 'index'}"
              class="text-lg lg:py-5 lg:px-3"
            >
              Search
            </nuxt-link>
          </li>
        </ul>
        <ul class="lg:flex items-center lg:h-16 lg:w-auto">
          <template v-if="$auth.loggedIn">
            <li>
              <nuxt-link :to="{name: 'dashboard'}"
                class="text-lg lg:py-5 lg:px-3"
              >
                Dashboard
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="{name: 'index'}"
                class="text-lg lg:py-5 lg:px-3"
              >
                {{$auth.user.name}}
              </nuxt-link>
            </li>
            <li>
              <a href="#"
                @click.prevent="logout"
                :to="{name: 'index'}"
                class="text-lg lg:py-5 lg:px-3"
              >
                Sign out
              </a>
            </li>
          </template>

          <template v-else>
            <li>
              <nuxt-link :to="{name: 'auth-login'}"
                class="text-lg lg:py-5 lg:px-3"
              >
                Sign in
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="{name: 'index'}"
                class="text-lg lg:py-5 lg:px-3"
              >
                Create account
              </nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      mobileNavOpen: false
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    }
  }
}

</script>