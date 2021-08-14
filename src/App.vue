<template>
  <div id="builder-app">
    <div class="sidebar">
      <a href="https://sterlingedmonton.com" class="return-link">
        <IconArrowNarrowLeft />
        Return back to website
      </a>
      <div class="logo"><img src="./assets/img/logo.png" alt=""></div>
      <div :class="{summary: true, disabled: selectedSections.community === false}">
        <div class="detail">
          <small>Starting From</small>
          <div class="price">$000.000</div>
        </div>
        <IconArrowNarrowRight :stroke-width="1.5" :width="40" :height="40" />
      </div>
      <div class="main-nav">
        <router-link to="/community">
          <!-- <div class="title"> -->
            <IconSquareChecked v-if="selectedSections.community" />
            <IconSquare v-if="selectedSections.community === false" />
            Community
          <!-- </div> -->
          <div class="selected-details" v-if="selectedSections.community">{{ selectedSections.community.name }}</div>
        </router-link>
        <router-link to="/model" v-if="selectedSections.community">
          <!-- <div class="title"> -->
            <IconSquareChecked v-if="selectedSections.model" />
            <IconSquare v-if="selectedSections.model === false" />
            Model
          <!-- </div> -->
          <div class="selected-details" v-if="selectedSections.model" v-html="selectedSections.model.title"></div>
        </router-link>
        <a href="javascript:;" class="disabled" v-if="selectedSections.community === false" >
          <IconSquare />
          Model
        </a>
        <router-link to="/floorplan" v-if="selectedSections.model" >
          <IconSquareChecked v-if="selectedSections.floorplanOptions.length > 0" />
          <IconSquare v-if="selectedSections.floorplanOptions.length === 0" />
          Floorplan
          <div class="selected-details">{{ selectedSections.floorplanOptions.length }} options selected</div>
        </router-link>
        <router-link to="/elevation" v-if="selectedSections.floorplanOptions.length > 0">
          <IconSquareChecked v-if="selectedSections.elevation" />
          <IconSquare v-if="selectedSections.elevation === false" />
          Elevation
          <div class="selected-details" v-if="selectedSections.elevation" v-html="selectedSections.elevation.elevation_name"></div>
        </router-link>
        <a href="javascript:;" class="disabled" v-if="selectedSections.model && selectedSections.floorplanOptions.length === 0" >
          <IconSquare />
          Elevation
        </a>
        <router-link to="/interior-colour" v-if="selectedSections.elevation">
          <IconSquareChecked v-if="selectedSections.interiorColour" />
          <IconSquare v-if="selectedSections.interiorColour === false" />
          Interior Colour
          <div class="selected-details" v-if="selectedSections.interiorColour" v-html="selectedSections.interiorColour.name"></div>
        </router-link>
        <a href="javascript:;" class="disabled" v-if="selectedSections.model === false && selectedSections.elevation === false" >
          <IconSquare />
          Interior Colour
        </a>
        <router-link to="/packaged-options" v-if="selectedSections.elevation && selectedSections.floorplanOptions.length > 0">
          <IconSquareChecked v-if="selectedSections.packaged" />
          <IconSquare v-if="selectedSections.packaged === false" />
          Packaged Options
          <div class="selected-details" v-if="selectedSections.packaged">{{selectedSections.packagedOptions.length}} options selected</div>
        </router-link>
        <a href="javascript:;" class="disabled" v-if="selectedSections.floorplanOptions.length > 0 && selectedSections.elevation === false">
          <IconSquare />
          Packaged Options
        </a>
        <router-link to="/basements-options" v-if="selectedSections.elevation && selectedSections.floorplanOptions.length > 0">
          <IconSquareChecked v-if="selectedSections.basements"/>
          <IconSquare v-if="selectedSections.basements === false" />
          Basement Options
          <div class="selected-details" v-if="selectedSections.basements">{{selectedSections.basementOptions.length}} options selected</div>
        </router-link>
        <a href="javascript:;" class="disabled" v-if="selectedSections.floorplanOptions.length > 0 && selectedSections.elevation === false">
          <IconSquare />
          Basement Options
        </a>
        <router-link to="/seasonal-options" v-if="selectedSections.elevation && selectedSections.floorplanOptions.length > 0">
          <IconSquareChecked v-if="selectedSections.seasonal" />
          <IconSquare v-if="selectedSections.seasonal === false" />
          Seasonal Options
          <div class="selected-details" v-if="selectedSections.seasonal">{{selectedSections.seasonalOptions.length}} options selected</div>
        </router-link>
        <a href="javascript:;" class="disabled" v-if="selectedSections.floorplanOptions.length > 0 && selectedSections.elevation === false" >
          <IconSquare />
          Seasonal Options
        </a>
        <router-link to="/plumbing-options" v-if="selectedSections.elevation && selectedSections.floorplanOptions.length > 0">
          <IconSquareChecked v-if="selectedSections.plumbing" />
          <IconSquare v-if="selectedSections.plumbing === false" />
          Plumbing Options
          <div class="selected-details" v-if="selectedSections.plumbing">{{selectedSections.plumbingOptions.length}} options selected</div>
        </router-link>
        <a href="javascript:;" class="disabled" v-if="selectedSections.floorplanOptions.length > 0 && selectedSections.elevation === false">
          <IconSquare />
          Plumbing Options
        </a>
        <router-link to="/lot" v-if="selectedSections.elevation && selectedSections.interiorColour">
          <IconSquareChecked v-if="selectedSections.lot" />
          <IconSquare v-if="selectedSections.lot === false" />
          Lot
        </router-link>
        <a href="javascript:;" class="disabled" v-if="selectedSections.interiorColour === false" >
          <IconSquare />
          Lot
        </a>
      </div>
    </div>
    <div class="main-content">
      <div class="toolbar">
        <a href="javascript:;" :class="{'start-over': true, disabled: selectedSections.community === false}" @click="resetSelection()">
          <IconRotate :width="18" :height="18" />
          Start Over
        </a>
      </div>
      <router-view/>
    </div>
  </div>
</template>
<script>
import IconSquare from "./icons/IconSquare";
import IconSquareChecked from "./icons/IconSquareChecked";
import IconArrowNarrowRight from "./icons/IconArrowNarrowRight";
import IconArrowNarrowLeft from "./icons/IconArrowNarrowLeft";
import {mapState, mapActions} from 'vuex';
import IconRotate from "./icons/IconRotate";

export default {
  components: {IconRotate, IconArrowNarrowLeft, IconArrowNarrowRight, IconSquareChecked, IconSquare},
  computed: mapState({
    selectedSections: state => state.builder.selected
  }),
  methods: {
    ...mapActions(['resetSelection'])
  }
}
</script>