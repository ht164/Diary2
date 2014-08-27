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
                // notify the end of loading to view.
                view.notifyEndOfLoading();
            };
            var onFail = function(){
                // notify the end of loading to view.
                view.notifyEndOfLoading();
            };
            // show loading.
            view.startLoading();
            // get recent diaryies.
            diary.getRecentDiaries({}, onLoad, onFail);
        },

        /**
         * set infinite scroll.
         */
        setInfiniteScroll: function(){
            var me = this;
            view.onFireLoadingNextData = function(){
                // TODO load next diaries.
                me.showRecentDiaries();
            };
        }
    };
});
