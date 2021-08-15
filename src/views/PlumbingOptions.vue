<template>
  <div class="page-additional-options">
    <div>
      <div class="title">Select Plumbing Options:</div>
      <div class="subTitle">The following options are available for this <b>{{selectedSections.model.title}}</b></div>
    </div>
    <div v-if="dataLoading.plumbing === true"><span>Loading...</span></div>
    <div v-if="dataLoading.plumbing === false">
      <div class="flex">
        <div class="col-w-2">NAME</div>
        <div class="col-w-5">DESCRIPTION</div>
        <div class="col-w-2">PRICE</div>
        <div class="col-w-3">ADD TO HOME</div>
      </div>
      <div 
        v-for="(plum ,i) in plumbingList" 
        :key="i"
        >
        <div class="row-flex row-space row-font">
          <div class="col-w-2">{{plum.plumbing_name}}</div>
          <div class="col-w-5">{{plum.plumbing_description}}</div>
          <div class="col-w-2">${{plum.plumbing_price}}</div>
          <div class="col-w-3" style="text-align: center;" @click="selectPlumbingOptions(plum)">
            <button class="btn" v-if="selectedSections.plumbingOptions.indexOf(plum) === -1">Add to home</button>
            <button class="btn" v-else>Added</button>
          </div>
        </div>
      </div>      
    </div>
    <div style="text-align: right" v-if="selectedSections.plumbingOptions.length > 0">
      <router-link to="/lot" class="elevation-button">
        Continue
        <IconArrowNarrowRight :stroke-width="1.5" :width="18" :height="18" />
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  computed: {
    ...mapState({
      selectedSections: state => state.builder.selected,
      dataLoading: state => state.builder.dataLoading,
      plumbingList: state => state.builder.plumbing,      
    }),
    
  },
  async mounted() {
    await this.getPlumbing();
    this.selectPlumbing();
  },
  methods: {
    ...mapActions(['getPlumbing', 'selectPlumbing', 'selectPlumbingOptions'])
  }
}
</script>
