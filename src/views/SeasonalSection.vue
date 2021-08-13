<template>
  <div class="page-additional-options">
      <div class="page-title-bg py-2  text-light">
          <div class="row align-items-center">
              <div class=" col-4 ">
                  <h1 class="page-title pl-3 mb-0">Seasonal Build & Price</h1>
                  <span class="text-light">Edit Duplicate Move Delete </span>
              </div>
            <p class=" pl-3 mb-0 col-4 ">Seasonal_bp</p>
            <p class=" pl-3 mb-0 col-4">Repetar</p>
          </div>
      </div>
    <div class="input-data py-3 col-10">
        <label class="form-label">Seasonal Build & Price</label>
        <input class="form-control" type="text"  placeholder="Seasonal Build & Price"/>
        <label class="form-label pt-3">Seasonal Description</label>
        <input class="form-control" type="text"  placeholder="Seasonal Description"/>
        <label class="form-label pt-3">Seasonal Repetar</label>
        <input class="form-control mb-3" type="text"  placeholder="Seasonal Repetar"/>
        <textarea class="form-control" style="height: 100px"></textarea>
        <div class="form-check form-switch py-4 ">
            <input class="form-check-input" type="checkbox" />
        </div>
    </div>
    <div class="mt-3">
      <div v-if="dataLoading.seasonal === true">Loading...</div>
        <table v-if="dataLoading.seasonal === false" class="table table-bordered border col-10 text-left p-3">
             <thead class="">
                 <tr class="border-bottom ">
                    <th scope="col" class="p-3">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Image</th>
                 </tr>
            </thead>
            <tbody>
                <tr>
                  <th colspan="4" class="border-bottom text-center py-4">
                    Dasement Options Data
                  </th>
                </tr>
                <tr v-for="item in filteredCommunities.basement_options" :key="item.basement_name" class="border-bottom">
                    <td class="p-3">{{item.basement_name}}</td>
                    <td class="lable-title"><b>{{item.basement_description}}</b></td>
                    <td>{{item.seasonal_price}}</td>
                    <td>{{item.basement_image}}</td>
                </tr>
                <tr>
                  <th colspan="4" class="border-bottom text-center py-4">
                    Seasonal Options Data
                  </th>
                </tr>
                <tr v-for="item in filteredCommunities.seasonal_options" :key="item.seasonal_name" class="border-bottom">
                    <td class="p-3">{{item.seasonal_name}}</td>
                    <td class="lable-title"><b>{{item.seasonal_description}}</b></td>
                    <td>{{item.seasonal_price}}</td>
                    <td>{{item.seasonal_image}}</td>
                </tr>
                <tr>
                  <th colspan="4" class="border-bottom text-center py-4">
                    Plumbing Options Data
                  </th>
                </tr>
                <tr v-for="item in filteredCommunities.plumbing_options" :key="item.plumbing_name" class="border-bottom">
                    <td class="p-3">{{item.plumbing_name}}</td>
                    <td class="lable-title"><b>{{item.plumbing_description}}</b></td>
                    <td>{{item.plumbing_price}}</td>
                    <td>{{item.plumbing_image}}</td>
                </tr>
                <tr>
                  <th colspan="4" class="border-bottom text-center py-4">
                    Packaged Options Data
                  </th>
                </tr>
                <tr v-for="item in filteredCommunities.packaged_options" :key="item.lifestyle_packages_price" class="border-bottom">
                    <td class="p-3">{{item.lifestyle_packages_name}}</td>
                    <td class="lable-title"><div style="max-width: 600px;"><b>{{item.lifestyle_packages_description}}</b></div></td>
                    <td>{{item.lifestyle_packages_price}}</td>
                    <td>{{item.lifestyle_packages_image}}</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
export default {
    computed: {
      filteredCommunities(){
        return this.seasonal
      },
    ...mapState({
      dataLoading: state => state.builder.dataLoading,
      seasonal: state => state.builder.seasonal,
    })
  },
    async mounted() {
    await this.getSeasonal();
    },
    methods: {
    ...mapActions(['getSeasonal'])
  }
}
</script>