import rp from 'request-promise';
import MotherShip from './current_price_msp';
import BitCoin from './current_price_btc';
import Promise from 'bluebird';

/**
 * Probably want to write a facade out from the main, but discord bot probably won't like having deeper point of contact...
 */
export default class api_methods {

    constructor() {
        this.main();

    }

    main() {

        this.msp = new MotherShip();
        this.btc = new BitCoin();

        Promise.all([
            this.msp.findCurrentPriceBTC('https://www.cryptopia.co.nz/api/GetMarketOrders/MSP_BTC/1'),
            this.msp.findCurrentPriceLTC('https://www.cryptopia.co.nz/api/GetMarketOrders/MSP_LTC/10'),
            this.btc.findCurrentTradePrice('https://www.cryptopia.co.nz/api/GetMarketOrders/LTC_BTC/10')
        ]).then((res) => {
            this.workoutAcceptablePrice(res[0], res[1], res[2]);
        });

        setInterval(() => {

        }, 600000);
    }

    /**
     * This class will need to take in a parameter (probably json object, depends on if only string is needed)
     * specific use case originally will be primarily LTC market, then potentially doge.
     *
     * @todo Get the price of the btc market before running this, also check rate limiting.
     */
    findMoney(endpoint, currentConvertedAmount, marketLabel) {
        return rp(endpoint).then((res) => {
            let raw = JSON.parse(res);

            // Should write the logic here to essentially break down if the ltc is actually worth based on first.
            // @todo Place a relevant point to break at below, or possibly analyse more of the sell part of the book.
            raw.Data.Sell.map((el, i) => {
                if (el.Price < currentConvertedAmount) {
                    this.findWorth().then((res) => {

                    })
                }
            });
        });
    }

    /**
     * Resolve reject promise that will likely call an api where I can get the current active price?
     * Might be worth moving that into another file as other classes are likely to need to make use of the price
     */
    findWorth(obj) {

    }

    /**
     * This function will work out the current acceptable price that purchasing LTC will provide a profit when xferred back to btc.
     * mspCurrentPrice - BTC Price
     */
    workoutAcceptablePrice(mspCurrentPriceBTC, mspCurrentPriceLTC, LtcToBtcPrice) {
        return Promise.resolve((resolve, reject) => {


        })
    }
}