import rp from 'request-promise';

export default class current_price_msp {

    findCurrentPriceBTC(endpoint) {
        return rp(endpoint).then((res) => {
            let raw = JSON.parse(res);

            return {
                current_price: raw.Data.Buy[0].Price,
                volume: raw.Data.Buy[0].Volume,
                label: raw.Data.Buy[0].Label
            }
        }).error((e) => {
            // @todo expand this for checking if the api is available, also find rate limiting error code for custom check
            console.log(e);
        })
    }

    /**
     * This will need to return multiple pairs. (5/10?)
     *
     * @param endpoint
     * @returns {Promise.<TResult>}
     */
    findCurrentPriceLTC(endpoint) {
        return rp(endpoint).then((res) => {
            let raw = JSON.parse(res);

            return raw.Data.Sell.map((el, i) => {
                return {price: el.Price, volume: el.Volume}
            });
        }).error((e) => {
            console.log(e);
        })
    }


}