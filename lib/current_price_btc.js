import rp from 'request-promise';

export default class current_price_btc {

    findCurrentTradePrice(endpoint) {
        return rp(endpoint).then((res) => {
            let raw = JSON.parse(res);

            
        });
    }

}