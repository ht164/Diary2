/**
 * front-end side view.
 * monthly diary entry.
 */

define(["util", "jquery", "underscore"], function(Util, $, _){
    return {
        // consts.
        SHOW_ALL_MONTHS: "全ての月を表示",
        HIDE_MONTHS: "月を隠す",
        /**
         * show monthly diary entry.
         */
        showMonthlyDiaries: function(monthlydiaries){
            var me = this;
            if (monthlydiaries.length > 0) {
                // create html fragment.
                var fragment = "<ul class='list-unstyled monthly-diary-list monthly-diary-top5-show'>";
                var count = 0;
                _.each(monthlydiaries, function(diary){
                    var str = "" + diary.year + "-" + diary.month + " (" + diary.count + ")";
                    var href = Util.generateMonthLinkUrl(diary.year, diary.month);
                    fragment += "<li"
                      + (count >= 5 ? " class='month-overflow'>" : "")
                      + "><a href='" + href + "'>" + str + "</a></li>";
                    count++;
                });
                fragment += "</ul>";
                
                var block = $("div#monthlyDiaryBlock");
                block.html(fragment);

                // toggle switch
                if (count >= 5) {
                    var toggle = $("<div class='show-monthly-diary-toggle'></div");
                    toggle.html(me.SHOW_ALL_MONTHS);
                    toggle.on("click", function(event){
                        me._showAllMonths(event);
                    });
                    toggle.appendTo(block);
                }
            }
        },

        /**
         * show all months.
         */
        _showAllMonths: function(){
            var me = this;

            $("div#monthlyDiaryBlock .monthly-diary-list")
            .addClass('monthly-diary-all-show')
            .removeClass('monthly-diary-top5-show');

            $("div#monthlyDiaryBlock div.show-monthly-diary-toggle")
            .off()
            .on("click", function(event){
                me._hideMonths(event);
            })
            .html(me.HIDE_MONTHS);
        },

        /**
         * hide months except top 5 months.
         */
        _hideMonths: function(){
            var me = this;

            $("div#monthlyDiaryBlock .monthly-diary-list")
            .addClass('monthly-diary-top5-show')
            .removeClass('monthly-diary-all-show');

            $("div#monthlyDiaryBlock div.show-monthly-diary-toggle")
            .off()
            .on("click", function(event){
                me._showAllMonths(event);
            })
            .html(me.SHOW_ALL_MONTHS);
        }
    };
});