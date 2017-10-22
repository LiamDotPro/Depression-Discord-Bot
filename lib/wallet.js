export default class wallet {

    constructor() {
        this.ltc = 0;
        this.btc = 0;
        this.miscToken = {};
    }

    /**
     * This will add a new token to the miscTokens object by setting a new key and holding the relevant data the app will
     * need.
     * @param identifer
     * @param amount
     * @param market_label
     */
    addTokens(identifer, amount, market_label) {
        this.miscToken[identifer] = {amount: amount, market_label: market_label};
    }

    /**
     * This will increase the amount of token are wallet is holding.
     * @param identifier
     * @param amount
     */
    increaseTokenAmount(identifier, amount) {
        if (typeof this.miscToken[identifier] !== 'undefined') {
            this.miscToken[identifier] += Number(amount);
        }
    }

    /**
     * This will remove a token using the accesor provided when adding a token.
     * @param identifier
     * @param amount
     */
    removeTokens(identifier, amount) {
        this.miscToken[identifier] = null;
    }

    /**
     * Increases the amount of ltc.
     * @param amount
     */
    increaseLTC(amount) {
        this.ltc += Number(amount)
    }

    /**
     * Increases the amount of btc.
     * @param amount
     */
    increaseBtc(amount) {
        this.btc += Number(amount)
    }


}