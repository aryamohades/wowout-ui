<template>
  <div id="app">
    <div class="header">
      <div class="header-section">
        <router-link :to="{ path: '/' }" class="header-brand">
          Wowout
        </router-link>
        <router-link :to="{ path: '/wowouts' }" class="header-link">Hall of Wowouts</router-link>
        <router-link :to="{ path: '/shame' }" class="header-link">Hall of Shame on Yous</router-link>
      </div>
      <div class="header-section" v-if="isAuth()">
        <router-link :to="{ path: '/me' }" class="profile-container">
          <img :src="profileImage" class="profile-image">
          <div class="header-name" v-text="name">
          </div>
        </router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => {
    return {
      name: localStorage.getItem('name'),
      profileImage: '/static/' + localStorage.getItem('profileImage')
    }
  },
  methods: {
    isAuth() {
      return localStorage.getItem('token') !== null
    }
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  flex: 1;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header {
  background: #fefefe;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  border-bottom: 1px solid #ccc;
  padding: 0 40px;
}

.header-brand {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  color: #333 !important;
  font-family: "Comic Sans MS", cursive, sans-serif;
  margin-right: 30px;
}

.header-name {
  color: #555;
  font-weight: bold;
}

.header-section {
  display: flex;
  align-items: center;
}

.profile-container {
  display: flex;
  align-items: center;
}

.profile-image {
  height: 40px;
  border-radius: 9999px;
  margin-right: 12px;
  border: 1px solid #888;
}

.header-link {
  color: #333333;
  margin-right: 20px;
  font-weight: 500;
}

.header-link:hover {
  color: #0652DD;
}
</style>
