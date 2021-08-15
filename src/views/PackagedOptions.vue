<template>
  <div class="page-additional-options">
    <div>
      <div class="title">Select Packaged options:</div>
      <div class="subTitle">The following options are available for this <b>{{selectedSections.model.title}}</b></div>
    </div>
    <div v-if="dataLoading.packaged === true"><span>Loading...</span></div>
    <div v-if="dataLoading.packaged === false">
      <div class="flex">
        <div class="col-w-2">SKU</div>
        <div class="col-w-4">NAME</div>
        <div class="col-w-4">DESCRIPTION</div>
        <div class="col-w-1">PRICE</div>
        <div class="col-w-2">ADD TO HOME</div>
      </div>
      <div 
        v-for="(packaged ,i) in packagedList" 
        :key="i"
        >
        <div class="row-flex row-space row-font">
          <div class="col-w-2">{{packaged.lifestyle_packages_name}}</div>
          <div class="col-w-4">{{packaged.lifestyle_packages_description}}</div>
          <div class="col-w-4">{{packaged.lifestyle_packages_specifications}}</div>
          <div class="col-w-1">${{packaged.lifestyle_packages_price}}</div>
          <div class="col-w-2" style="text-align: center;" @click="selectPackagedOptions(packaged)">
            <button class="btn" v-if="selectedSections.packagedOptions.indexOf(packaged) === -1">Add to home</button>
            <button class="btn" v-else>Added</button>
          </div>
        </div>
      </div>      
    </div>
    <div style="text-align: right" v-if="selectedSections.packagedOptions.length > 0">
      <router-link to="/basements-options" class="elevation-button">
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
      packagedList: state => state.builder.packaged,      
    }),
    
  },
  async mounted() {
    await this.getPackaged();
    this.selectPackaged();
  },
  methods: {
    ...mapActions(['getPackaged', 'selectPackaged', 'selectPackagedOptions'])
  }
}
</script>

