export const getIsLogged = state => state.auth;

export const getAdverts_sel = state => state.ads.data;

export const getTagsSelector = state => {let r = state.tags.tagState; console.log(r); debugger};
export const getTagsSelector2 = state => state.tags;

export const areAdsLoaded = state => state.ads.loaded;

export const getUi = state => state.ui

export const getAd = (state, adId) => { 
    state.ads.data.find(ad => ad.id === Number(adId))
}
