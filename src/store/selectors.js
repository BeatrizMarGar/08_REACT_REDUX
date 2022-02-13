import { advert } from "../components/adverts/propTypes";

export const getIsLogged = state => state.auth;

export const getAdverts_sel = state => state.ads.data;

//export const getTagsSelector = state => state.tags.tagState;
export const getTagsSelector2 = state => state.tags;

export const areAdsLoaded = state => state.ads.loaded;

export const getUi = state => state.ui

export const getAd = (state, adId) => {
    let storeAds = state.ads.data
    let w = storeAds.find(ad =>ad.id === adId)
    return w
}
