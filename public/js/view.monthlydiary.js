/**
 * front-end side view.
 * monthly diary entry.
 */

define(["util", "jquery", "underscore"], function(Util, $, _){
    return {
        /**
         * show monthly diary entry.
         */
        showMonthlyDiaries: function(monthlydiaries){
            var me = this;
            if (monthlydiaries.length > 0) {
                // create html fragment.
                var fragment = "<ul class='list-unstyled monthly-diary-list'>";
                _.each(monthlydiaries, function(diary){
                    var str = "" + diary.year + "-" + diary.month + " (" + diary.count + ")";
                    var href = Util.generateMonthLinkUrl(diary.year, diary.month);
                    fragment += "<li><a href='" + href + "'>" + str + "</a></li>";
                });
                fragment += "</ul>";
                $("div#monthlyDiaryBlock").html(fragment);
            }
        }
    };
});