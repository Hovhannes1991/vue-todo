<template>
  <div class="select_font_container">
    <select name="select_font" @change="selectFont" v-model="selectedFont">
      <option v-for="(font, index) in fonts" :value="font" :key="index">
        {{ normilizedFont }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectFont",

  filters: {
      normalize(value){
          if(value.charAt(0) === '"'){
              value = value.slice(1,-1)
          }

          return value;
      }
  },

  data(){
      return{
          selectedFont: 'roboto',
          fonts: ['roboto', 'pacifico', 'lobster', '"Dancing Script"',
                  '"sans-serif"', 'cinzel', 'monoton', '"coda caption"', '"open sans"']
      }
  },

  computed: {
      normilizedFont(){
          if(this.selectedFont.charAt(0) === '"'){
              return this.selectedFont.slice(1,-1)
          }
          else{
              return this.selectedFont;
          }
      }
  },

  methods:{
      selectFont(){
          this.$emit('selectFont', this.selectedFont);
      }
  }
};
</script>

<style lang="css" scoped>
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Pacifico&family=Roboto:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Cinzel&family=Pacifico&family=Roboto:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Cinzel&family=Monoton&family=Pacifico&family=Roboto:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Cinzel&family=Coda+Caption:wght@800&family=Monoton&family=Pacifico&family=Roboto:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@800&display=swap");

.select_font_container {
  outline: none;
  border: none;
  margin-right: 10px;
  opacity: 0.1;
  transition: opacity 0.3s linear;
}

.select_font_container:hover {
  opacity: 1;
}

.select_font_container select,
.select_font_container option {
  text-transform: capitalize;
}
</style>
