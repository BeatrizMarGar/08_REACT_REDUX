export const getIsLogged = state => state.auth;

export const getAdverts_sel = state => state.ads;

export const getUi = state => state.ui

export const getAd = (state, adsId) => {console.log(adsId); state.ads.find(ads => ads.id === adsId)}
//export const getAd = state => adsId => state.ads.find(ads => ads.id === adsId)