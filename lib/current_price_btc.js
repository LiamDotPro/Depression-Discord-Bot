import rp from 'request-promise';

export default class current_price_btc {

    findCurrentTradePrice(endpoint) {
        return rp(endpoint).then((res) => {
            let raw = JSON.parse(res);

            return {price: raw.Data.Buy[0].Price, volume: raw.Data.Buy[0].Volume}
        });
    }

    findCurrentBuyPrice(endpoint) {
        return rp(endpoint).then((res) => {
            let raw = JSON.parse(res);

            return {price: raw.Data.Sell[0].Price, volume: raw.Data.Sell[0].Volume}
        });
    }

}