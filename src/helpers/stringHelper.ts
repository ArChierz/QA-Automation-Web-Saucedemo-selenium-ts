import { text } from "node:stream/consumers"

export const stringHelper = {

    // check list string ascending
    isAscending(texts: any) {

        // use texts.length - 1 because need to compare the previous arr with next arr
        for(let i = 0; i < texts.length - 1; i++){

            // the localecompare rule based on alphabets
            // -1 if A before B
            // 0 if match
            // 1 if A after B
            if(texts[i].localeCompare(texts[i+1]) > 0) {
                return false;
            }
        }
        return true;

    },

    // check list string descending
    isDescending(texts: any){

        for(let i = 0; i < texts.length - 1; i++){
            if(texts[i].localeCompare(texts[i+1]) < 0) {
                return false;
            }
        }
        return true;
    },

    // strip $ from price into a number
    stripDollar(texts: string[]){
        const strippedTexts: string[] = [];

        for (const text of texts){
            strippedTexts.push(text.replace("$",""));
        }
        return strippedTexts;

    },



    // check number low to high
    isLowToHigh(prices: any) {

        prices = this.stripDollar(prices);

        // use prices.length - 1 because need to compare the previous arr with next arr
        for(let i = 0; i < prices.length - 1; i++){

            // the localecompare rule based on alphabets
            // -1 if A before B
            // 0 if match
            // 1 if A after B
            if(prices[i].localeCompare(prices[i+1]) > 0) {
                return false;
            }
        }
        return true;

    },

    // check number hi to low
    isHighToLow(prices: any){

        prices = this.stripDollar(prices);

        for(let i = 0; i < prices.length - 1; i++){
            if(prices[i].localeCompare(prices[i+1]) < 0) {
                return false;
            }
        }
        return true;
    },


}