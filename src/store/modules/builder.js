import axios from "axios";
import router from '../../router';
import basementList from './basement.json';
import plumbing from './plumbing.json';
import packaged from './packaged.json';
import seasonal from './seasonal.json';

const state = {
    communities: [],
    models: [],
    seasonal:[],
    floorplans: [],
    additionalOptions: [],
    elevations: [],
    interiorColours: [],
    basements:[],
    plumbing:[],
    packaged:[],
    packagedOptions:[],
    basementOptions:[],
    plumbingOptions:[],
    seasonalOptions:[],
    dataLoading: {
        community: false,
        model: false,
        floorplan: false,
        additionalOptions: false,
        elevation: false,
        interiorColours: false,
        basements: false,
        plumbing: false,
        packaged: false,
        seasonal: false,
    },
    selected: {
        community: false,
        model: false,
        floorplanOptions: [],
        additionalOptions: [],
        elevation: false,
        interiorColour: false,
        lot: false,
        basements: false,
        plumbing: false,
        packaged: false,
        seasonal: false,
        basementOptions: [],
        packagedOptions: [],
        plumbingOptions: [],
        seasonalOptions: [],
    }
};

const actions = {
    async getCommunities(context) {
        context.commit('setCommunities', []);
        context.commit('setDataLoading', {type: 'community', status: true});
        let response = await axios.get('/wp-json/builder/communities');
        context.commit('setCommunities', response.data);
        context.commit('setDataLoading', {type: 'community', status: false});
    },
    async getSeasonal(context) {
        context.commit('setSeasonal', []);
        context.commit('setDataLoading', {type: 'seasonal', status: true});
        // let response = await axios.get('/wp-json/builder/options?model_id=24833');
        context.commit('setSeasonal', seasonal);
        context.commit('setDataLoading', {type: 'seasonal', status: false});
    },
    async getBasements(context) {
        context.commit('setBasements', []);
        context.commit('setDataLoading', {type: 'basements', status: true});
        let response = basementList;
        context.commit('setBasements', response);
        context.commit('setDataLoading', {type: 'basements', status: false});
    },
    async getPlumbing(context) {
        context.commit('setPlumbing', []);
        context.commit('setDataLoading', {type: 'basements', status: true});
        context.commit('setPlumbing', plumbing);
        context.commit('setDataLoading', {type: 'basements', status: false});
    },
    async getPackaged(context) {
        context.commit('setPackaged', []);
        context.commit('setDataLoading', {type: 'basements', status: true});
        context.commit('setPackaged', packaged);
        context.commit('setDataLoading', {type: 'basements', status: false});
    },
    async getModels(context) {
        context.commit('setModels', []);
        context.commit('setDataLoading', {type: 'model', status: true});
        let response = await axios.get(`/wp-json/builder/models?community_ids=${context.state.selected.community.id}`);
        context.commit('setModels', response.data);
        context.commit('setDataLoading', {type: 'model', status: false});
    },
    async getFloorplans(context) {
        context.commit('setFloorplans', []);
        context.commit('setDataLoading', {type: 'floorplan', status: true});
        let response = await axios.get(`/wp-json/builder/floorplans?model_id=${context.state.selected.model.id}`);
        context.commit('setFloorplans', response.data);
        context.commit('setDataLoading', {type: 'floorplan', status: false});
    },
    async getElevations(context) {
        context.commit('setElevations', []);
        context.commit('setDataLoading', {type: 'elevation', status: true});
        let url = `/wp-json/builder/elevations?community_id=${context.state.selected.community.id}&model_id=${context.state.selected.model.id}`;
        let response = await axios.get(url);
        context.commit('setElevations', response.data);
        context.commit('setDataLoading', {type: 'elevation', status: false});
    },
    async getInteriorColours(context) {
        context.commit('setInteriorColours', []);
        context.commit('setDataLoading', {type: 'interiorColours', status: true});
        let url = `/wp-json/builder/interior-colours?model_id=${context.state.selected.model.id}`;
        let response = await axios.get(url);
        context.commit('setInteriorColours', response.data);
        context.commit('setDataLoading', {type: 'interiorColours', status: false});
    },
    resetSelection(context) {
        context.commit('resetSelection');
        if (router.currentRoute.name !== 'Community') {
            router.push('/');
        }
    },
    selectCommunity(context, community) {
        if (context.state.selected.community !== false && context.state.selected.community.id !== community.id) {
            context.commit('selectModel', false);
            context.commit('selectElevation', false);
            context.commit('resetFloorplanOptions');
        }
        context.commit('selectCommunity', community);
        router.push('/model');
    },
    selectModel(context, model) {
        if (context.state.selected.model !== false && context.state.selected.model.id !== model.id) {
            context.commit('selectElevation', false);
            context.commit('resetFloorplanOptions');
        }
        context.commit('selectModel', model);
        router.push('/floorplan');
    },
    toggleFloorplanOption(context, optionName) {
        context.commit('toggleFloorplanOptions', optionName);
    },
    selectElevation(context, elevation) {
        context.commit('selectElevation', elevation);
        router.push('/interior-colour');
    },
    selectInteriorColour(context, interiorColour) {
        context.commit('selectInteriorColour', interiorColour);
        router.push('/packaged-options');
    },
    selectBasements(context) {
        context.commit('selectBasements', true);
        // router.push('/seasonal-options');
    },
    selectPackaged(context) {
        context.commit('selectPackaged', true);
        // router.push('/basements-options');
    },
    selectPlumbing(context) {
        context.commit('selectPlumbing', true);
        // router.push('/lot');
    },
    selectSeasonal(context) {
        context.commit('selectSeasonal', true);
        // router.push('/plumbing-options');
    },
    selectlots(context) {
        context.commit('selectlots', true);
    },
    selectPackagedOptions(context, packaged) {
        context.commit('selectPackagedOptions', packaged);
    },
    selectBasementsOptions(context, basement) {
        context.commit('selectBasementsOptions', basement);
    },
    selectPlumbingOptions(context, plumbing) {
        context.commit('selectPlumbingOptions', plumbing);
    },
    selectSeasonalOptions(context, seasonal) {
        context.commit('selectSeasonalOptions', seasonal);
    }
}

const mutations = {
    setCommunities(state, communities) {
        state.communities = communities;
    },
    setSeasonal(state, seasonal) {
        state.seasonal = seasonal;
    },
    setBasements(state, basements) {
        state.basements = basements;
    },
    setPackaged(state, packaged) {
        state.packaged = packaged;
    },
    setPlumbing(state, plumbing) {
        state.plumbing = plumbing;
    },
    setModels(state, models) {
        state.models = models;
    },
    setFloorplans(state, floorplans) {
        state.floorplans = floorplans;
    },
    setElevations(state, elevations) {
        state.elevations = elevations;
    },
    setInteriorColours(state, interiorColours) {
        state.interiorColours = interiorColours;
    },
    resetSelection(state) {
        state.selected = {
            community: false,
            model: false,
            floorplanOptions: [],
            elevation: false,
            lot: false,
            basements: false,
            plumbing: false,
            packaged: false,
            seasonal: false,
            basementOptions: [],
            packagedOptions: [],
            seasonalOptions: [],
            plumbingOptions: []
        };
    },
    setDataLoading(state, payload) {
        state.dataLoading[payload.type] = payload.status;
    },
    selectCommunity(state, community) {
        state.selected.community = community;
    },
    selectModel(state, model) {
        state.selected.model = model;
    },
    toggleFloorplanOptions(state, optionName) {
        let index = state.selected.floorplanOptions.indexOf(optionName);
        if (index > -1) {
            state.selected.floorplanOptions.splice(index, 1);
        } else {
            state.selected.floorplanOptions.push(optionName);
        }
    },
    resetFloorplanOptions(state) {
        state.selected.floorplanOptions = [];
    },
    selectElevation(state, elevation) {
        state.selected.elevation = elevation;
    },
    selectInteriorColour(state, interiorColour) {
        state.selected.interiorColour = interiorColour;
    },
    selectBasements(state, basement) {
        state.selected.basements = basement;
    },
    selectPlumbing(state, plumbing) {
        state.selected.plumbing = plumbing;
    },
    selectPackaged(state, packaged) {
        state.selected.packaged = packaged;
    },
    selectSeasonal(state, seasonal) {
        state.selected.seasonal = seasonal;
    },
    selectlots(state, lots) {
        state.selected.lot = lots;
    },
    selectPackagedOptions(state, packaged) {
        console.log(state.selected.packagedOptions.type);
        let index = state.selected.packagedOptions.indexOf(packaged);
        if (index > -1) {
            state.selected.packagedOptions.splice(index, 1);
        } else {
            state.selected.packagedOptions.push(packaged);
        }
    },
    selectBasementsOptions(state, basement) {
        let index = state.selected.basementOptions.indexOf(basement);
        if (index > -1) {
            state.selected.basementOptions.splice(index, 1);
        } else {
            state.selected.basementOptions.push(basement);
        }
    },
    selectPlumbingOptions(state, plumbing) {
        let index = state.selected.plumbingOptions.indexOf(plumbing);
        if (index > -1) {
            state.selected.plumbingOptions.splice(index, 1);
        } else {
            state.selected.plumbingOptions.push(plumbing);
        }
    },
    selectSeasonalOptions(state, seasonal) {
        let index = state.selected.seasonalOptions.indexOf(seasonal);
        if (index > -1) {
            state.selected.seasonalOptions.splice(index, 1);
        } else {
            state.selected.seasonalOptions.push(seasonal);
        }
    }
};

export default {
    state,
    actions,
    mutations
}