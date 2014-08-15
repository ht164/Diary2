/**
 * front-end side controller.
 */

define(["view", "diary"], function(view, diary){
    return {
        /**
         * show recent diaries.
         */
        showRecentDiaries: function(){
            // get recent diaryies.
            var diaries = diary.getRecentDiaries();
            view.showDiaries(diaries);
        }
    };
});
