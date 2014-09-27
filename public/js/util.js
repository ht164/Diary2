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
        }
    };
});
