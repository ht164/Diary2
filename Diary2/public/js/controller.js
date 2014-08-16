/**
 * front-end side controller.
 */

define(["view", "diary"], function(view, diary){
    return {
        /**
         * show recent diaries.
         */
        showRecentDiaries: function(){
            var onLoad = function(diaries){
                view.showDiaries(diaries);
            };
            var onFail = function(){

            };
            // get recent diaryies.
            diary.getRecentDiaries({}, onLoad, onFail);
        }
    };
});
