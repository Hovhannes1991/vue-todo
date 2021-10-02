<template>
  <div class="search_and_filter">
    <img
      @click="show_filters_list = !show_filters_list"
      class="icon"
      src="./../assets/filter_icon.png"
      alt="filter_icon"
    />
    <div v-if="show_filters_list" class="filters_list">
      <div
        v-for="(item, index) in filters_list"
        :key="index"
        class="filter_item"
      >
        <label>
          <input
            @change="setFilterData"
            type="checkbox"
            :value="item.value"
            v-model="selected_filters"
          />
          {{ item.label }}
        </label>
      </div>
    </div>
    <input
      @input="setSearchText"
      v-model="search_value"
      class="search_field"
      type="text"
    />
    <img class="icon" src="./../assets/search_icon.png" alt="search_icon" />
  </div>
</template>

<script>
export default {
  name: "SearchAndFilter",

  data() {
    return {
      search_value: "",
      show_filters_list: false,
      selected_filters: [],
      filters_list: [
        {value: 'completed', label: "Completed" },
        {value: 'not_completed', label: "Not Completed" },
        {value: 'done', label: "Done" },
        {value: 'checked', label: "Checked" },
      ],
    };
  },

  methods: {
    selectFont(selectedFont) {
      this.$emit("selectFont", selectedFont);
    },

    setSearchText() {
      this.$emit("setSearchText", this.search_value);
    },

    setFilterData() {
      this.$emit("setFilterData", this.selected_filters);
    },
  },
};
</script>

<style lang="css" scoped>
.search_and_filter {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border-radius: 20px 20px 0 0;
  padding: 0 10px;
}

.filters_list {
  position: absolute;
  width: auto;
  height: auto;
  background: #fff;
  padding: 5px 50px 5px 10px;
  color: var(--blue);
  top: 5px;
  left: 40px;
  z-index: 100;
  border: 1px solid var(--blue);
}

.icon {
  cursor: pointer;
  width: 24px;
}

.search_field {
  width: 100%;
  height: 80%;
  margin: 0 10px;
  border: none;
  outline: none;
  padding: 0 10px;
  font-size: 1.2em;
  color: var(--blue);
}
</style>
