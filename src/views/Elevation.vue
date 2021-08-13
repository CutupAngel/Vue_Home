<template>
  <div class="page-elevation">
    <h1 class="page-title">Select your exterior home elevation</h1>
    <p>The following elevations are available in the <strong>{{selectedSections.community.name}}</strong></p>
    <div v-if="dataLoading.elevation === true">Loading...</div>
    <div v-if="dataLoading.elevation === false && filteredElevations.length === 0">No elevations found.</div>
    <div class="builder-cards" v-if="dataLoading.elevation === false">
      <div class="builder-card selected" v-if="selectedSections.elevation">
        <div class="selected-badge">Selected</div>
        <div class="cover" :style="{backgroundImage: 'url(' + selectedSections.elevation.elevation_image + ')' }"></div>
        <div class="content">
          <h3 v-html="selectedSections.elevation.elevation_name"></h3>
          <div class="price"><FormattedPrice :price="selectedSections.elevation.elevation_price" /></div>
        </div>
      </div>
      <div class="builder-card" v-for="elevation in filteredElevations" :key="elevation.elevation_name" @click="selectElevation(elevation)">
        <div class="cover" :style="{backgroundImage: 'url(' + elevation.elevation_image + ')' }"></div>
        <div class="content">
          <h3 v-html="elevation.elevation_name"></h3>
          <div class="price"><FormattedPrice :price="elevation.elevation_price" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import store from '../store';
import router from '../router';
import FormattedPrice from "../components/FormattedPrice";

export default {
  components: {FormattedPrice},
  computed: {
    filteredElevations() {
      return this.elevations.filter(elevation => {
        return elevation.elevation_name !== this.selectedSections.elevation.elevation_name;
      });
    },
    ...mapState({
      dataLoading: state => state.builder.dataLoading,
      elevations: state => state.builder.elevations,
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
    await this.getElevations();
  },
  methods: {
    ...mapActions(['getElevations', 'selectElevation'])
  }
}
</script>