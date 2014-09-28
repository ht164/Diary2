/**
 * Utility functions.
 */

define(["moment"], function(moment){
    return {
        /**
         * generate diary permalink url.
         */
        generateDiaryPermalinkUrl: function(date) {
            var momentDate = new moment(date);
            return "/diary/" + momentDate.format("YYYY/MM/DD");
        },

        /**
         * generate month link url.
         */
        generateMonthLinkUrl: function(year, month) {
            var momentDate = new moment([year, month - 1]);
            return "/diary/" + momentDate.format("YYYY/MM");
        },

        /**
         * generate date string.
         *
         * @param date
         * @param [validData="YMD"] valid property in date instance. "YMD" or "YM" or "Y".
         */
        generateDateStr: function(date, validData) {
            var momentDate = new moment(date);
            var format = "";
            switch(validData) {
                case "Y":
                    format = "YYYY";
                    break;
                case "YM":
                    format = "YYYY-MM";
                    break;
                case "YMD":
                default:
                    format = "YYYY-MM-DD";
                    break;
            }
            return momentDate.format(format);
        }
    };
});
