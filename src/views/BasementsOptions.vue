<template>
  <div class="page-additional-options">
    <div>
      <div class="title">Select Basement Options:</div>
      <div class="subTitle">The following options are available for this <b>{{selectedSections.model.title}}</b></div>
    </div>
    <div v-if="dataLoading.basements === true"><span>Loading...</span></div>
    <div v-if="dataLoading.basements === false">
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
          <div class="col-w-2">{{data.basement_name}}</div>
          <div class="col-w-5">{{data.basement_description}}</div>
          <div class="col-w-2">${{data.seasonal_price}}</div>
          <div class="col-w-3" @click="selectBasements(data)"><button class="btn">Add to home</button></div>
        </div>
      </div>      
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
      dataList: state => state.builder.basements,      
    }),
  },
  async mounted() {
    await this.getBasements();
  },
  methods: {
    ...mapActions(['getBasements', 'selectBasements'])
  }
}
</script>
