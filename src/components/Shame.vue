<template>
  <div class="page-container">
    <div class="page-header">Hall of Shame on Yous</div>
    <div class="wowouts-container">
        <div v-for="(shame, index) in shameOnYous" class="wowout-container" :key="index">
          <img class="wowout-image" :src="getImageSrc(shame.shameReceiver.image)">
          <div class="wowout-name" v-text="shame.shameReceiver.name"></div>
          <div class="wowout-description" v-text="shame.description"></div>
          <div class="wowout-giver-container">
            <img class="wowout-giver-image" :src="getImageSrc(shame.shameGiver.image)">
            <div class="wowout-giver-name" v-text="shame.shameGiver.name"></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'Home',
  created() {
    axios.get('http://localhost:3000/api/shameonyous/history')
      .then((res) => {
        this.shameOnYous = res.data.data.shameonyous
      })
      .catch((res) => {
        this.appError = 'Error retrieving data'
      })
  },
  data() {
    return {
      shameOnYous: []
    }
  },
  methods: {
    getImageSrc(file) {
      return '/static/' + file
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.page-header {
  font-size: 28px;
  font-weight: bold;
  margin-top: 45px;
  margin-bottom: 45px;
}

.wowout-header {
  font-family: "Comic Sans MS", cursive, sans-serif;
  font-weight: bold;
  margin-bottom: 15px;
  font-size: 24px;
}
.wowout-button {
  background: #009432;
  border: 1px solid #555;
  min-width: 150px;
  font-weight: bold;
  font-size: 15px;
}

.wowout-button:hover {
  background: #00b33c;
}
.shame-button {
  background: #EA2027;
}

.shame-button:hover {
  background: #ee444a;
}

.wowouts-container {
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

.wowout-image {
  border: 1px solid #ccc;
  height: 100px;
}

.wowout-container {
  width: 33%;
  position: relative;
  margin-bottom: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.wowout-name {
  margin-top: 8px;
  font-weight: bold;
  font-size: 20px;
}

.wowout-description {
  font-style: italic;
  width: 200px;
  text-align: center;
}

.wowout-giver-container {
  display: flex;
  align-items: center;
  margin-top: 12px;
}

.wowout-giver-image {
  height: 25px;
  margin-right: 8px;
  border-radius: 9999px;
  border: 1px solid #ccc;
}

.wowout-giver-name {
  font-size: 14px;
  font-weight: 300;
}
</style>
