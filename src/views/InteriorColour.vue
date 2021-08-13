<template>
  <div class="page-interior-colours">
    <h1 class="page-title">Select your colour palette</h1>
    <p>The following colour palettes are available in the <strong v-html="selectedSections.model.title"></strong></p>
    <div v-if="dataLoading.interiorColours === true">Loading...</div>
    <div v-if="dataLoading.interiorColours === false && filteredItems.length === 0">No record found.</div>
    <div class="builder-cards" v-if="dataLoading.interiorColours === false">
      <div class="builder-card selected" v-if="selectedSections.interiorColour">
        <div class="selected-badge">Selected</div>
        <div class="cover" :style="{backgroundImage: 'url(' + selectedSections.interiorColour.image + ')' }"></div>
        <div class="content">
          <h3 v-html="selectedSections.interiorColour.name"></h3>
          <p>{{selectedSections.interiorColour.description}}</p>
        </div>
      </div>
      <div class="builder-card" v-for="item in filteredItems" :key="item.name" @click="selectInteriorColour(item)">
        <div class="cover" :style="{backgroundImage: 'url(' + item.image + ')' }"></div>
        <div class="content">
          <h3 v-html="item.name"></h3>
          <p>{{item.description}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import store from '../store';
import router from '../router';

export default {
  computed: {
    filteredItems() {
      return this.interiorColours.filter(item => {
        return item.name !== this.selectedSections.interiorColour.name;
      });
    },
    ...mapState({
      dataLoading: state => state.builder.dataLoading,
      interiorColours: state => state.builder.interiorColours,
      selectedSections: state => state.builder.selected
    })
  },
  beforeRouteEnter(to, from, next) {
    if (store.state.builder.selected.floorplanOptions.length === 0) {
      next(false);
      if (router.currentRoute.name !== 'Community') {
        router.push('/');
      }
    } else {
      next();
    }
  },
  async mounted() {
    await this.getInteriorColours();
  },
  methods: {
    ...mapActions(['getInteriorColours', 'selectInteriorColour'])
  }
}
</script>