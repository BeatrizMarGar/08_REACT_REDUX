import { getAd } from "./selectors";

describe('GetAd', ()=>{
    test('should load an ad', () => {
        const data = [{id: 1}, { id:2}]
        const state = {
            ads:{
                data,
            },
        };
        expect(getAd(state, '2')).toEqual(data[0[1]])
    }),
    test('should be undefined', () => {
        const data = [{id: 1}, { id:2}]
        const state = {
            ads:{
                data,
            },
        };
        expect(getAd(state, '5')).toBeUndefined(data[0[1]])
    })
})
;