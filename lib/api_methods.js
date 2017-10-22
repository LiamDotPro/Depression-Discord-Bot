import rp from 'request-promise';
import MotherShip from './current_price_msp';
import BitCoin from './current_price_btc';
import Promise from 'bluebird';
import wallet from './wallet';

/**
 * Probably want to write a facade out from the main, but discord bot probably won't like having deeper point of contact...
 */
export default class api_methods {

    constructor() {
        this.wallet = new wallet();
        this.main();
    }

    main() {
        this.msp = new MotherShip();
        this.btc = new BitCoin();

        Promise.all([
            this.msp.findCurrentPriceBTC('https://www.cryptopia.co.nz/api/GetMarketOrders/MSP_BTC/1'),
            this.msp.findCurrentPriceLTC('https://www.cryptopia.co.nz/api/GetMarketOrders/MSP_LTC/10'),
            this.btc.findCurrentTradePrice('https://www.cryptopia.co.nz/api/GetMarketOrders/LTC_BTC/10'),
            this.btc.findCurrentBuyPrice('https://www.cryptopia.co.nz/api/GetMarketOrders/LTC_BTC/10')
        ]).then((res) => {
            console.log(res[0], res[1], res[2]);
            this.workoutAcceptablePrice(res[0], res[1], res[2], res[3]);
        });

        //
        // setInterval(() => {
        //
        // }, 600000);
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
     * Need to figure out the correct maths for converting from LTC -> BTC (Might be simpler to find an api that does it based on the live prices as opposed to using the current market price,
     * but it's better to do it on the current cryptopia market for the future.)
     *
     * Buy Litecoin for bitcoin (1 ltc =  0.01122327 - £48.56), Buy mothership from litecoin (LTC 1.00200000 ~ 714.21939391 MSP tokens), sell Mothership tokens for bitcoin (BTC 0.01346462 £58.26)
     * 0.5 LTC ~ Always keep 0.5 LTC
     */
    workoutAcceptablePrice(mspCurrentPriceBTC, mspCurrentPriceLTC, LtcToBtcPrice, ltcFromBtcPrice) {

        // if (this.wallet.ltc < 0.5) {
        //     // buy LTC
        //
        // } else if () {
        //     //
        // }

        /**
         * Want to add GDAX support so we can sell the leftovers directly after, might be better to find a good point..
         */
        if (this.wallet.btc > 0.05) {

        }

        let costOfLtc = (ltcFromBtcPrice.price * 0.5).toFixed(8);

        // figuring out the ltc cost of the buy orders.
        let currentPriceTopVolume = Number((mspCurrentPriceLTC.buy[0].volume * mspCurrentPriceLTC.buy[0].price)).toFixed(8);
        let bitcoinAmount = (currentPriceTopVolume * LtcToBtcPrice.price).toFixed(8);

        // figuring out the current cost for quick sell via btc
        let amountOfMspToBtc = (bitcoinAmount / mspCurrentPriceBTC.price).toFixed(8);
        let amountBroughtByLtc = (mspCurrentPriceLTC.buy[0].price * amountOfMspToBtc).toFixed(8);

        console.log(currentPriceTopVolume);
        console.log(bitcoinAmount);
        console.log(amountOfMspToBtc);
        console.log(amountBroughtByLtc);
        console.log(ltcFromBtcPrice);
        console.log(costOfLtc);

        let bitcoinPrice = (mspCurrentPriceLTC.price * mspCurrentPriceLTC.volume) / LtcToBtcPrice.price;

        console.log(bitcoinPrice);
    }

    /**
     * This is where the bot will go if it's looking to buy ltc due to not having significant funds available to start.
     */
    buyLtc() {

    }

    /**
     * This is where the bot will go if it's looking to buy btc from gdax api.
     */
    buyBtc() {

    }
}