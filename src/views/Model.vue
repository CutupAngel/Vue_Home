<template>
  <div class="page-model">
    <h1 class="page-title">Models</h1>
    <div v-if="dataLoading.model === true">Loading...</div>
    <div v-if="dataLoading.model === false && filteredModels.length === 0">No models found.</div>
    <div class="builder-cards" v-if="dataLoading.model === false">
      <div class="builder-card selected" v-if="selectedSections.model">
        <div class="selected-badge">Selected</div>
        <div class="cover" :style="{backgroundImage: 'url(' + selectedSections.model.featured_image + ')' }"></div>
        <div class="content">
          <h3 v-html="selectedSections.model.title"></h3>
          <div class="price">Starting From: <strong><FormattedPrice :price="selectedSections.model.starting_from" /></strong></div>
        </div>
      </div>
      <div class="builder-card" v-for="model in filteredModels" :key="model.id" @click="selectModel(model)">
        <div class="cover" :style="{backgroundImage: 'url(' + model.featured_image + ')' }"></div>
        <div class="content">
          <h3 v-html="model.title"></h3>
          <div class="price">Starting From: <strong><FormattedPrice :price="model.starting_from" /></strong></div>
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
    filteredModels() {
      return this.models.filter(model => {
        return model.id !== this.selectedSections.model.id;
      });
    },
    ...mapState({
      dataLoading: state => state.builder.dataLoading,
      models: state => state.builder.models,
      selectedSections: state => state.builder.selected
    })
  },
  beforeRouteEnter(to, from, next) {
    if (store.state.builder.selected.community === false) {
      next(false);
      if (router.currentRoute.name !== 'Community') {
        router.push('/');
      }
    } else {
      next();
    }
  },
  async mounted() {
    await this.getModels();
  },
  methods: {
    ...mapActions(['getModels', 'selectModel'])
  }
}
</script>