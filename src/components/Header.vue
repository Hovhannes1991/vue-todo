<template>
  <header class="header" :class="{'no_user_data' : !isAuth}">
      <UserInfo v-if="isAuth"/>
      <SelectFont @selectFont='selectFont'/>
  </header>
</template>

<script>
import UserInfo from './UserInfo.vue';
import SelectFont from './SelectFont.vue';
import { mapGetters } from "vuex";
export default {
  name: "Header",
  components: {UserInfo, SelectFont},

  computed: {
    ...mapGetters(["isAuth"]),
  },

  methods: {
      selectFont(selectedFont){
          this.$emit('selectFont', selectedFont);
      }
  }
};
</script>

<style lang="css" scoped>
.header {
    position: fixed;
    width: 100%;
    height: 80px;    
    background-image: linear-gradient(221deg, #31363c 0%, #28313b 74%);
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
}

/* whne no userinfo section */
.header.no_user_data{
  justify-content: flex-end;
}
</style>
