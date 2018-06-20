<template>
  <div class="page-container">
    <div class="page-header">Redeem your points</div>
    <div v-if="points !== null" class="points-text">Balance: <b><span v-text="points"></span></b> Points</div>
    <div v-if="points !== null" class="rewards-container">
      <div class="rewards-header">Choose a reward:</div>
      <div class="reward-container">
        <img class="reward-image" :src="'/static/amazon25.png'">
        <button @click="redeem(10)" :disabled="!hasEnoughPoints(10)" class="redeem-button" v-text="redeemText(10)"></button>
      </div>
      <div class="reward-container">
        <img class="reward-image" :src="'/static/amazon100.png'">
        <button @click="redeem(100)" :disabled="!hasEnoughPoints(100)" class="redeem-button" v-text="redeemText(100)"></button>
      </div>
    </div>
    <img>
  </div>
</template>

<script>
const Swal = require('sweetalert2');
const axios = require('axios')

export default {
  name: 'Home',
  created() {
    this.refreshPoints()
  },
  data() {
    return {
      points: null,
      pointsText: '',
      apiBase: 'https://obscure-bayou-43244.herokuapp.com/api/'
    }
  },
  methods: {
    refreshPoints() {
      axios({
        method: 'get',
        url: this.apiBase + '/me',
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then((res) => {
        this.points = res.data.user.points
      })
      .catch((res) => {
        this.appError = 'Error retrieving data'
      })
    },
    redeemText(cost) {
      if (this.points >= cost) {
        return `Redeem (${cost} Points)`;
      } else {
        return `Requires ${cost} Points`;
      }
    },
    hasEnoughPoints(cost) {
      return this.points >= cost;
    },
    redeem(cost) {
      axios({
        method: 'post',
        url: this.apiBase + '/redeem',
        data: {
          cost
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then((res) => {
        this.refreshPoints();

        Swal(
          'Success!',
          'Check your email to claim your reward!',
          'success'
        );
      })
      .catch((e) => {
        console.log(e.message);
      });
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
}

.points-text {
  font-size: 22px;
  margin-top: 25px;
  margin-bottom: 35px;
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

.reward-image {
  height: 150px;
}

.rewards-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.reward-container {
  display: flex;
  align-items: center;
  width: 450px;
  justify-content: space-between;
  border-bottom: 1px solid #dedede;
  border-top: 1px solid #dedede;
}

.rewards-header {
  margin-bottom: 25px;
}

.redeem-button {
  font-size: 16px;
  min-width: 200px;
  background: #009432;
}

.redeem-button:hover {
  background: #00b33c;
}
</style>
