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
        }
    };
});
