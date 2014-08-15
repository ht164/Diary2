/**
 * front-end side controller.
 */

define(["view"], function(view){
    return {
        /**
         * show recent diaries.
         */
        showRecentDiaries: function(){
            // get recent diaryies.
            // dummy data.
            var diaries = [ {
                title: "title1",
                content: "<p>content1.</p>",
                date: new Date("2014-08-01")
            }, {
                title: "title2",
                content: "<p>content2.</p>",
                date: new Date("2014-08-02")
            } ];

            view.showDiaries(diaries);

        }
    };
});
