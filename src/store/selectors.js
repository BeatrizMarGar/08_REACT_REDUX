export const getIsLogged = state => state.auth;

export const getAdverts_sel = state => state.ads.data;

export const areAdsLoaded = state => state.ads.loaded;

export const getUi = state => state.ui

export const getAd = (state, adId) => { 
    console.log(state + adId);
    debugger;
    state.ads.data.find(ad => ad.id === Number(adId))
}
