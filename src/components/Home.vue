<template>
  <div class="page-container">
    <div class="overlay" :class="{ active: creatingWowout || creatingShame}" @click="closeModal"></div>
    <div class="create-wowout-modal" v-if="creatingWowout">
      <div class="close-modal-icon" @click="closeModal">
        <i class="fas fa-times"></i>
      </div>
      <div class="new-wowout-label">New Wowout</div>
      <div class="user-search-container">
        <input @focus="toggleSearch(true)" @blur="toggleSearch(false)" v-model="userSearchTerm" class="wowout-user-search" placeholder="Who?" @input="updateSearchResults">
        <div class="user-search-results-container" v-if="isSearchFocused">
          <div v-for="(user, index) in userSearchResults" class="user-search-result" :key="index" @click="selectUser(user.name, user.id, user.image)">
            <img class="search-result-image" :src="getImageSrc(user.image)">
            <div class="search-result-name" v-text="user.name"></div>
          </div>
        </div>
      </div>
      <div class="selected-user-container" v-if="selectedUser">
        <img class="selected-user-image" :src="getImageSrc(selectedUser.image)">
        <div class="selected-user-message" v-html="whyMessage(selectedUser.name)"></div>
      </div>
      <textarea v-model="whyText" placeholder="Why?" style="resize: none;"></textarea>
      <button @click="createWowout" :disabled="selectedUser === null || whyText === ''" class="wowout-button" v-text="wowoutButtonText()"></button>
    </div>
    <div class="create-wowout-modal" v-if="creatingShame">
      <div class="close-modal-icon" @click="closeModal">
        <i class="fas fa-times"></i>
      </div>
      <div class="new-wowout-label">New Shame On You</div>
      <div class="user-search-container">
        <input @focus="toggleSearch(true)" @blur="toggleSearch(false)" v-model="userSearchTerm" class="wowout-user-search" placeholder="Who?" @input="updateSearchResults">
        <div class="user-search-results-container" v-if="isSearchFocused">
          <div v-for="(user, index) in userSearchResults" class="user-search-result" :key="index" @click="selectUser(user.name, user.id, user.image)">
            <img class="search-result-image" :src="getImageSrc(user.image)">
            <div class="search-result-name" v-text="user.name"></div>
          </div>
        </div>
      </div>
      <div class="selected-user-container" v-if="selectedUser">
        <img class="selected-user-image" :src="getImageSrc(selectedUser.image)">
        <div class="selected-user-message" v-html="whyMessage(selectedUser.name)"></div>
      </div>
      <textarea v-model="whyText" placeholder="Why?" style="resize: none;"></textarea>
      <button @click="createShame" :disabled="selectedUser === null || whyText === ''" class="wowout-button shame-button" v-text="shameButtonText()"></button>
    </div>
    <div class="section">
      <div class="countdown-text" v-text="countdown"></div>
      <div class="leader-text" v-html="getWowoutLeaderText()"></div>
      <div class="leader-text" v-html="getShameLeaderText()"></div>
    </div>
    <div class="section">
      <div class="wowout-header">WOWOUTS</div>
      <button class="wowout-button hvr-pulse-grow" @click="createWowoutModal">WOWOUT</button>
      <div class="wowouts-container">
        <div v-for="(wowout, index) in wowouts" class="wowout-container" :key="index">
          <img v-if="index === 0" src="/static/crown.svg" class="wowout-frontrunner">
          <img class="wowout-image" :src="getImageSrc(wowout.wowoutReceiver.image)">
          <div class="wowout-name" v-text="wowout.wowoutReceiver.name"></div>
          <div class="wowout-description" v-text="wowout.description"></div>
          <div class="wowout-giver-container">
            <img class="wowout-giver-image" :src="getImageSrc(wowout.wowoutGiver.image)">
            <div class="wowout-giver-name" v-text="wowout.wowoutGiver.name"></div>
          </div>
          <div class="wowout-controls">
            <div class="wowout-votes" v-text="wowout.updoots"></div>
            <div class="wowout-updoot" @click="updoot(wowout.id)">
              <i class="fas fa-thumbs-up"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="wowout-header">SHAME ON YOUS</div>
      <button @click="createShameModal" class="wowout-button shame-button hvr-buzz">SHAME</button>
      <div class="wowouts-container">
        <div v-for="(shame, index) in shameOnYous" class="wowout-container" :key="index">
          <img v-if="index === 0" src="/static/buffoon.svg" class="wowout-frontrunner">
          <img class="wowout-image" :src="getImageSrc(shame.shameReceiver.image)">
          <div class="wowout-name" v-text="shame.shameReceiver.name"></div>
          <div class="wowout-description" v-text="shame.description"></div>
          <div class="wowout-controls">
            <div class="wowout-votes wowout-downdoot-votes" v-text="shame.updoots"></div>
            <div class="wowout-updoot wowout-downdoot" @click="downdoot(shame.id)">
              <i class="fas fa-thumbs-down"></i>
            </div>
          </div>
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
    axios.get('http://localhost:3000/api/users')
      .then((res) => {
        this.users = res.data.data.users
        this.userSearchResults = this.users
      })
      .catch((res) => {
        this.appError = 'Error retrieving data'
      })

    this.refreshWowouts()
    this.refreshShameOnYous()

    this.dhm();
  },
  data () {
    return {
      wowouts: [],
      shameOnYous: [],
      users: [],
      creatingWowout: false,
      creatingShame: false,
      userSearchResults: [],
      selectedUser: null,
      userSearchTerm: '',
      whyText: '',
      countdown: '',
      isSearchFocused: false
    }
  },
  methods: {
    toggleSearch(search) {
      this.isSearchFocused = search;
    },
    createShame() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/shameonyous',
        data: {
          userId: this.selectedUser.id,
          description: this.whyText
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then((res) => {
        this.refreshShameOnYous();
        this.closeModal();
      })
      .catch((error) => {
        this.appError = error.message
      });
    },
    createWowout() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/wowouts',
        data: {
          userId: this.selectedUser.id,
          description: this.whyText
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then((res) => {
        this.refreshWowouts();
        this.closeModal();
      })
      .catch((error) => {
        this.appError = error.message
      });
    },
    selectUser(name, userId, image) {
      this.selectedUser = {
        id: userId,
        name,
        image
      },
      this.userSearchTerm = '';
      this.userSearchResults = this.users;
    },
    updateSearchResults({ target }) {
      if (target.value === '') {
        this.userSearchResults = this.users;
      }
      else {
        this.userSearchResults = this.users.filter((user) => (
          user.name.toLowerCase().startsWith(this.userSearchTerm.toLowerCase())
        ));
      }
    },
    createWowoutModal() {
      this.userSearchTerm = '';
      this.userSearchResults = this.users;
      this.selectedUser = null;
      this.whyText = '';
      this.creatingWowout = true;
      this.creatingShame = false;
      document.body.classList.add('active');
    },
    createShameModal() {
      this.userSearchTerm = '';
      this.userSearchResults = this.users;
      this.selectedUser = null;
      this.whyText = '';
      this.creatingWowout = false;
      this.creatingShame = true;
      document.body.classList.add('active');
    },
    closeModal() {
      this.creatingWowout = false;
      this.creatingShame = false;
      document.body.classList.remove('active');
    },
    refreshWowouts() {
      axios.get('http://localhost:3000/api/wowouts')
      .then((res) => {
        this.wowouts = res.data.data.wowouts
      })
      .catch((res) => {
        this.appError = 'Error retrieving data'
      })
    },
    refreshShameOnYous() {
      axios.get('http://localhost:3000/api/shameonyous')
      .then((res) => {
        this.shameOnYous = res.data.data.shameonyous
      })
      .catch((res) => {
        this.appError = 'Error retrieving data'
      })
    },
    getImageSrc(file) {
      return '/static/' + file
    },
    updoot(wowoutId) {
      axios({
        method: 'post',
        url: `http://localhost:3000/api/wowouts/${wowoutId}/updoot`,
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      .then((res) => {
        this.refreshWowouts()
      })
      .catch((error) => {
        console.log(error.message)
      })
    },
    downdoot(shameId) {
      axios({
        method: 'post',
        url: `http://localhost:3000/api/shameonyous/${shameId}/downdoot`,
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      .then((res) => {
        this.refreshShameOnYous()
      })
      .catch((error) => {
        console.log(error.message)
      })
    },
    whyMessage(name) {
      return `WOWOUT <b>${name}</b>`;
    },
    shameButtonText() {
      return this.selectedUser
        ? `SHAME ${this.selectedUser.name}`
        : 'SHAME'
    },
    wowoutButtonText() {
      return this.selectedUser
        ? `WOWOUT ${this.selectedUser.name}`
        : 'WOWOUT'
    },
    getWowoutLeaderText() {
      if (this.wowouts.length > 0) {
        return `Current Wowout Leader: <b>${this.wowouts[0].wowoutReceiver.name}</b>`;
      } else {
        return 'Current Wowout Leader'
      }
    },
    getShameLeaderText() {
      if (this.shameOnYous.length > 0) {
        return `Current Shame Leader: <b>${this.shameOnYous[0].shameReceiver.name}</b>`;
      } else {
        return 'Current Shame Leader'
      }
    },
    dhm() {
      const t1 = new Date();
      const t2 = new Date(2018, 5, 29, 0, 0, 0, 0);
      const dif = t1.getTime() - t2.getTime();
      const ms = Math.abs(dif);
      const days = Math.floor(ms / (24*60*60*1000));
      const daysms=ms % (24*60*60*1000);
      const hours = Math.floor((daysms)/(60*60*1000));
      const hoursms=ms % (60*60*1000);
      const minutes = Math.floor((hoursms)/(60*1000));
      const minutesms=ms % (60*1000);
      const sec = Math.floor((minutesms)/(1000));
      this.countdown = `Time Remaining: ${days} days ${hours} hours ${minutes} minutes ${sec} seconds`;
      setTimeout(this.dhm, 1000);
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

.section {
  flex: 1;
  padding: 35px;
  border-bottom: 1px solid #333;
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

.wowout-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
}
.wowout-votes {
  margin-right: 12px;
  font-weight: bold;
  color: #009432;
  font-size: 24px;
}

.wowout-updoot {
  font-size: 20px;
  cursor: pointer;
  transition: all .2s ease;
  padding: 8px;
}

.wowout-updoot:hover {
  color: #009432;
  transform: scale(1.2);
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

.wowout-frontrunner {
  position: absolute;
  bottom: calc(100% - 15px);
  left: calc(50% - 25px);
  height: 50px;
}

.wowout-downdoot-votes {
  color: #EA2027;
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

.wowout-downdoot:hover {
  color: #EA2027;
}

.overlay {
  opacity: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .65);
  z-index: 10;
  transition: all .3s ease;
}

.overlay.active {
  opacity: 1;
  pointer-events: initial;
}

.create-wowout-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 11;
  width: 600px;
  padding: 35px;
  background: #fefefe;
  left: calc(50% - 300px);
  border-radius: 5px;
  border: 1px solid #888;
}

.create-wowout-modal > textarea {
  padding: 8px;
  font-size: 18px;
  width: 100%;
  height: 175px;
  margin-bottom: 25px;
  transition: all .2s ease;
  border: 1px solid #ccc;
  margin-top: 25px;
}

.create-wowout-modal > textarea:focus {
  outline: none;
  border: 1px solid blue;
}

.new-wowout-label {
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: left;
}

.wowout-user-search {
  width: 100%;
}

.wowout-user-search:focus {
  outline: none;
  border: 1px solid blue;
}

.user-search-container {
  position: relative;
  width: 100%;
}

.user-search-results-container {
  border-top: none;
  width: 100%;
}

.user-search-result {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  background: white;
  transition: all .1s ease;
  border: 1px solid #ccc;
}

.user-search-result:hover {
  background: #eeeeee;
}
.search-result-image {
  height: 40px;
  border-radius: 9999px;
  margin-right: 20px;
}

.close-modal-icon {
  position: absolute;
  right: 12px;
  top: 12px;
  padding: 8px;
  font-size: 22px;
  cursor: pointer;
  transition: all .2s ease;
}

.close-modal-icon:hover {
  transform: scale(1.2);
}

.selected-user-container {
  display: flex;
  align-items: center;
  margin-top: 25px;
}

.selected-user-image {
  height: 75px;
  margin-right: 12px;
  border: 1px solid #888;
}

.countdown-text {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.leader-text {
  font-size: 18px;
}
</style>
