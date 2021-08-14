<template>
  <div class="page-floorplan">
    <h1 class="page-title">Floorplan</h1>
    <div v-if="dataLoading.floorplan === true">Loading...</div>
    <div v-if="dataLoading.floorplan === false">
      <div class="floorplan-wrapper">
        <div class="floorplan-image">
          <h3>Step 1: View Floorplan Options Below</h3>
          <iframe :src="selectedSections.model.floorplan_link" style="width: 100%; height: 600px;"></iframe>
        </div>
        <div class="floorplan-options-wrapper">
          <h3>Step 2: Make Your Selections</h3>
          <div class="floorplan-options">
            <div class="accordion" v-if="floorplans.main_floor_options.length > 0">
              <div :class="{'accordion-toggle': true, 'active': accordion === 'main_floor'}" @click="changeMainCategory('main_floor')">
                Main Floor
                <IconChevronRight v-if="accordion !== 'main_floor'" :stroke-width="3" />
                <IconChevronDown v-if="accordion === 'main_floor'" :stroke-width="3" />
              </div>
              <div class="accordion-items" v-if="accordion === 'main_floor'">
                <div class="accordion-item" v-for="option in floorplans.main_floor_options" :key="option.option_description" @click="toggleFloorplanOption(option)">
                  <IconSquare v-if="selectedSections.floorplanOptions.indexOf(option) === -1" />
                  <IconSquareChecked v-if="selectedSections.floorplanOptions.indexOf(option) > -1" />
                  {{ option.option_description }}
                  (<strong><FormattedPrice :price="option.option_price" /></strong>)
                </div>
              </div>
            </div>
            <div class="accordion" v-if="floorplans.upper_floor_options.length > 0">
              <div :class="{'accordion-toggle': true, 'active': accordion === 'upper_floor'}" @click="changeMainCategory('upper_floor')">
                Upper Floor
                <IconChevronRight v-if="accordion !== 'upper_floor'" :stroke-width="3" />
                <IconChevronDown v-if="accordion === 'upper_floor'" :stroke-width="3" />
              </div>
              <div class="accordion-items" v-if="accordion === 'upper_floor'">
                <div class="accordion-item" v-for="option in floorplans.upper_floor_options" :key="option.option_description" @click="toggleFloorplanOption(option)">
                  <IconSquare v-if="selectedSections.floorplanOptions.indexOf(option) === -1" />
                  <IconSquareChecked v-if="selectedSections.floorplanOptions.indexOf(option) > -1" />
                  {{ option.option_description }}
                  (<strong><FormattedPrice :price="option.option_price" /></strong>)
                </div>
              </div>
            </div>
            <div class="accordion" v-if="floorplans.lower_floor_options.length > 0">
              <div :class="{'accordion-toggle': true, 'active': accordion === 'lower_floor'}" @click="changeMainCategory('lower_floor')">
                Lower Floor
                <IconChevronRight v-if="accordion !== 'lower_floor'" :stroke-width="3" />
                <IconChevronDown v-if="accordion === 'lower_floor'" :stroke-width="3" />
              </div>
              <div class="accordion-items" v-if="accordion === 'lower_floor'">
                <div class="accordion-item" v-for="option in floorplans.lower_floor_options" :key="option.option_description" @click="toggleFloorplanOption(option)">
                  <IconSquare v-if="selectedSections.floorplanOptions.indexOf(option) === -1" />
                  <IconSquareChecked v-if="selectedSections.floorplanOptions.indexOf(option) > -1" />
                  {{ option.option_description }}
                  (<strong><FormattedPrice :price="option.option_price" /></strong>)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="text-align: right" v-if="selectedSections.floorplanOptions.length > 0">
        <router-link to="/elevation" class="elevation-button">
          Continue
          <IconArrowNarrowRight :stroke-width="1.5" :width="18" :height="18" />
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import {mapState, mapActions} from 'vuex';
import store from '../store';
import router from '../router';
import IconChevronRight from "../icons/IconChevronRight";
import IconChevronDown from "../icons/IconChevronDown";
import IconArrowNarrowRight from "../icons/IconArrowNarrowRight";
import IconSquare from "../icons/IconSquare";
import IconSquareChecked from "../icons/IconSquareChecked";
import FormattedPrice from "../components/FormattedPrice";

export default {
  components: {FormattedPrice, IconSquareChecked, IconSquare, IconArrowNarrowRight, IconChevronDown, IconChevronRight},
  data() {
    return {
      accordion: null,
      sub_accordion: null
    }
  },
  computed: {
    ...mapState({
      dataLoading: state => state.builder.dataLoading,
      floorplans: state => state.builder.floorplans,
      selectedSections: state => state.builder.selected
    })
  },
  beforeRouteEnter(to, from, next) {
    if (store.state.builder.selected.model === false) {
      next(false);
      if (router.currentRoute.name !== 'Model') {
        router.push('/model');
      }
    } else {
      next();
    }
  },
  async mounted() {
    await this.getFloorplans();
  },
  methods: {
    ...mapActions(['getFloorplans', 'toggleFloorplanOption']),
    changeMainCategory(name) {
      this.sub_accordion = null;
      this.accordion = this.accordion === name ? null : name;
    },
    changeSubCategory(name) {
      this.sub_accordion = this.sub_accordion === name ? null : name;
    }
  }
}
</script>