<template>
  <div class="page-community">
    <h1 class="page-title">Choose your community</h1>
    <div v-if="dataLoading.community === true">Loading...</div>
    <div class="builder-cards" v-if="dataLoading.community === false">
      <div class="builder-card selected" v-if="selectedSections.community">
        <div class="selected-badge">Selected</div>
        <div class="cover" :style="{backgroundImage: 'url(' + selectedSections.community.cover + ')' }"></div>
        <div class="content">
          <h3>{{ selectedSections.community.name }}</h3>
          <div>{{ selectedSections.community.model_count }} models found.</div>
        </div>
      </div>
      <div class="builder-card" v-for="community in filteredCommunities" :key="community.id" @click="selectCommunity(community)">
        <div class="cover" :style="{backgroundImage: 'url(' + community.cover + ')' }"></div>
        <div class="content">
          <h3>{{ community.name }}</h3>
          <div>{{ community.model_count }} models found.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  computed: {
    filteredCommunities(){
      return this.communities.filter(community => {
        return community.id !== this.selectedSections.community.id;
      });
    },
    ...mapState({
      dataLoading: state => state.builder.dataLoading,
      communities: state => state.builder.communities,
      selectedSections: state => state.builder.selected
    })
  },
  async mounted() {
    await this.getCommunities();
  },
  methods: {
    ...mapActions(['getCommunities', 'selectCommunity'])
  }
}
</script>
