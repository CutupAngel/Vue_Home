<template>
  <div class="page-lot">
    <div class="title">Choose your lot</div>
    <div id="gmapdiv">
      <iframe id="lwmap" src="https://maps.lotworks.ca/maps/sterlingedm/sienna/build" style="border: 0; width: 80%; height: 100%;" @click="selectCommunity()"></iframe> 
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  // computed: {
  //   filteredCommunities(){
  //     return this.communities.filter(community => {
  //       return community.id !== this.selectedSections.community.id;
  //     });
  //   },
  //   ...mapState({
  //     dataLoading: state => state.builder.dataLoading,
  //     communities: state => state.builder.communities,
  //     selectedSections: state => state.builder.selected
  //   })
  // },
  // async mounted() {
  //   await this.getCommunities();
  // },
  // methods: {
  //   ...mapActions(['getCommunities', 'selectCommunity'])
  // }
}
</script>