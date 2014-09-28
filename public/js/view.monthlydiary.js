/**
 * front-end side view.
 * monthly diary entry.
 */

define(["util", "jquery", "underscore"], function(Util, $, _){
    return {
        // consts.
        SHOW_ALL_MONTHS: "全ての月を表示",
        HIDE_MONTHS: "月を隠す",

        ID_DISPLAY_BLOCK: "monthlyDiaryBlock",
        CLASS_MONTHLY_DIARY_LIST: "monthly-diary-list",
        CLASS_SHOW_TOP5: "monthly-diary-top5-show",
        CLASS_SHOW_ALL: "monthly-diary-all-show",
        CLASS_TOGGLE: "show-monthly-diary-toggle",
        CLASS_OVERFLOWED_MONTH: "month-overflow",

        /**
         * show monthly diary entry.
         */
        showMonthlyDiaries: function(monthlydiaries){
            var me = this;
            if (monthlydiaries.length > 0) {
                // create html fragment.
                var fragment = "<ul class='list-unstyled " + me.CLASS_MONTHLY_DIARY_LIST + " " + me.CLASS_SHOW_TOP5 + "'>";
                var count = 0;
                _.each(monthlydiaries, function(diary){
                    var str = "" + diary.year + "-" + diary.month + " (" + diary.count + ")";
                    var href = Util.generateMonthLinkUrl(diary.year, diary.month);
                    fragment += "<li"
                      + (count >= 5 ? " class='" + me.CLASS_OVERFLOWED_MONTH + "'" : "")
                      + "><a href='" + href + "'>" + str + "</a></li>";
                    count++;
                });
                fragment += "</ul>";
                
                var block = $("div#" + me.ID_DISPLAY_BLOCK);
                block.html(fragment);

                // toggle switch
                if (count >= 5) {
                    var toggle = $("<div class='" + me.CLASS_TOGGLE + "'></div");
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

            $("div#" + me.ID_DISPLAY_BLOCK + " ." + me.CLASS_MONTHLY_DIARY_LIST)
            .addClass(me.CLASS_SHOW_ALL)
            .removeClass(me.CLASS_SHOW_TOP5);

            $("div#" + me.ID_DISPLAY_BLOCK + " div." + me.CLASS_TOGGLE)
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

            $("div#" + me.ID_DISPLAY_BLOCK + " ." + me.CLASS_MONTHLY_DIARY_LIST)
            .addClass(me.CLASS_SHOW_TOP5)
            .removeClass(me.CLASS_SHOW_ALL);

            $("div#" + me.ID_DISPLAY_BLOCK + " div." + me.CLASS_TOGGLE)
            .off()
            .on("click", function(event){
                me._showAllMonths(event);
            })
            .html(me.SHOW_ALL_MONTHS);
        }
    };
});