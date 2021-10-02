<template>
  <div class="user_info_container">   
          <div class="user_info">
            <img v-if="userData.gender === 'female'" src="./../assets/profile_icon_female.svg" alt="profile icon">
            <img v-else src="./../assets/profile_icon_male.svg" alt="profile icon">
            <p>{{ userData.displayName }}</p>
            <input id="logout" type="button" value="Log Out" @click="logOut" />
          </div>
        </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "UserInfo",

  computed: mapGetters(["userData"]),

  methods: {
      ...mapActions(["fetchLogOut"]),

      logOut() {
      this.fetchLogOut();   
    },
  }
};
</script>

<style lang="css" scoped>
.user_info_container {  
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user_info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
}

.user_info img {
  width: 35px;
}

.user_info p {
  margin:  0 5px;
  color: var(--blue);
}
</style>
