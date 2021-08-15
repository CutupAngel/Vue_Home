<template>
  <div class="page-additional-options">
    <div>
      <div class="title">Select Seasonal Options:</div>
      <div class="subTitle">The following options are available for this <b>{{selectedSections.model.title}}</b></div>
    </div>
    <div v-if="dataLoading.seasonal === true"><span>Loading...</span></div>
    <div v-if="dataLoading.seasonal === false">
      <div class="flex">
        <div class="col-w-2">NAME</div>
        <div class="col-w-5">DESCRIPTION</div>
        <div class="col-w-2">PRICE</div>
        <div class="col-w-3">ADD TO HOME</div>
      </div>
      <div 
        v-for="(data ,i) in dataList" 
        :key="i"
        >
        <div class="row-flex row-space row-font">
          <div class="col-w-2">{{data.seasonal_name}}</div>
          <div class="col-w-5">{{data.seasonal_description}}</div>
          <div class="col-w-2">${{data.seasonal_price}}</div>
          <div class="col-w-3" style="text-align: center;" @click="selectSeasonalOptions(data)">
            <button class="btn" v-if="selectedSections.seasonalOptions.indexOf(data) === -1">Add to home</button>
            <button class="btn" v-else>Added</button>
          </div>
        </div>
      </div>      
    </div>
    <div style="text-align: right" v-if="selectedSections.seasonalOptions.length > 0">
      <router-link to="/plumbing-options" class="elevation-button">
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
      dataList: state => state.builder.seasonal,      
    }),
    
  },
  async mounted() {
    await this.getSeasonal();
    this.selectSeasonal();
  },
  methods: {
    ...mapActions(['getSeasonal', 'selectSeasonal', 'selectSeasonalOptions'])
  }
}
</script>
