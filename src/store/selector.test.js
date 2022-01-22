import { getAd } from "./selectors";

describe('GetAd', ()=>{
    test('should do', () => {
        const data = [{id: 1}, { id:2}]
        const state = {
            ads:{
                data,
            },
        };
        expect(getAd(state, 2)).toEqual(data[0[1]])
    })
})