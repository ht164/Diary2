/**
 * Calendar module.
 *
 * show calendar and link of year, month, date.
 */

define(["util", "jquery", "underscore", "moment"], function(Util, $, _, moment){
    /**
     * Calendar class
     *
     * @param initialDate
     */
    function Calendar(initialDate){
        initialDate = initialDate || new Date();
        this.year = initialDate.getFullYear();
        this.month = initialDate.getMonth() + 1;
        this.datesHavingLink = [];

        this.elementId = null;

        this.onClickPrevMonth = undefined;
        this.onClickNextMonth = undefined;
    };

    /**
     * methods.
     */
    Calendar.prototype = {
        /**
         * consts.
         */
        WEEK_STRING: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],

        /**
         * show calendar in specified element.
         *
         * @param options
         *    @param options.elementId element id.
         *    @param options.dates array. each element has "link" property.
         *    @param options.onClickPrevMonth event fired prev-month button is clicked.
         *    @param options.onClickNextMonth event fired next-month button is clicked.
         */
        show: function(options){
            var me = this;
            if (!options || !options.elementId) return;

            me.elementId = options.elementId;
            if (options.dates) {
                me.datesHavingLink = _.clone(options.dates);
            }
            me.onClickPrevMonth = options.onClickPrevMonth;
            me.onClickNextMonth = options.onClickNextMonth;

            var dom = me._createDom();
            $("#" + options.elementId).append(dom);
        },

        /**
         * create calendar DOM.
         */
        _createDom: function(){
            var me = this;

            // year/month.
            var headerElement = me._createHeaderDom();
            // table.
            var datesElement = me._createDatesDom();

            var dom = $("<div></div>");
            dom.append(headerElement).append(datesElement);
            return dom;
        },

        /**
         * create header DOM.
         */
        _createHeaderDom: function(){
            var me = this;

            var table = $("<table></table>");
            var tr = $("<tr></tr>");
            table.append(tr);

            var tdPrevBtn = $("<td class='prev-month'></td>");
            var prevBtn = $("<button class='btn btn-default btn-xs'><span class='glyphicon glyphicon-chevron-left'></span></button>");
            prevBtn.on("click", me._hitch(me._movePrevMonth, me));
            tdPrevBtn.append(prevBtn);
            tr.append(tdPrevBtn);

            var tdYearMonth = $("<td class='year-month'>" + me.year + "/" + me.month + "</td>");
            tr.append(tdYearMonth);

            var tdNextBtn = $("<td class='next-month'></td>");
            var nextBtn = $("<button class='btn btn-default btn-xs'><span class='glyphicon glyphicon-chevron-right'></button>");
            nextBtn.on("click", me._hitch(me._moveNextMonth, me));
            tdNextBtn.append(nextBtn);
            tr.append(tdNextBtn);

            return table;
        },

        /**
         * create dates DOM.
         */
        _createDatesDom: function(){
            var me = this;

            var fragment = "<table class='dates'>";

            // week.
            fragment += "<tr>";
            for (var week = 0; week < 7; week++) {
                fragment += "<td"
                    + (week == 0 ? " class='week-sun'" : 
                        (week == 6 ? " class='week-sat'" : ""))
                    + ">" + me.WEEK_STRING[week] + "</td>";
            }
            fragment += "</tr>";

            // days.
            var _moment = new moment([me.year, me.month - 1, 1]);
            var day = _moment.day();  // what day is year/month/01 ?
            var currentDate = 0 - day + 1;
            var lastDate = _moment.daysInMonth();
            while(currentDate <= lastDate) {
                fragment += "<tr>";
                for (var week = 0; week < 7; week++){
                    fragment += "<td"
                    + (week == 0 ? " class='week-sun'" : 
                        (week == 6 ? " class='week-sat'" : ""))
                    + ">"
                    + ((currentDate > 0 && currentDate <= lastDate)
                        ? (me.datesHavingLink[currentDate]
                            ? "<span class='diary-exists'><a href='"
                              + Util.generateDiaryPermalinkUrl(new Date(me.year, me.month - 1, currentDate))
                              + "'>" + currentDate + "</a></span>"
                            : currentDate )
                        : "")
                    + "</td>";
                    currentDate++;
                }
                fragment += "</tr>";
            }
            fragment += "</table>";

            return $(fragment);
        },

        /**
         * called when prevMonth button is clicked.
         */
        _movePrevMonth: function(){
            var me = this;

            var newYear = me.year;
            var newMonth = me.month - 1;
            if (newMonth == 0) {
                newMonth = 12;
                newYear--;
            }
            // function that user of Calendar set dates having link.
            // after set, begin to show prev month calendar.
            var setDates = function(dates){
                me.datesHavingLink = _.clone(dates);
                showPrevMonth();
            };

            // function that shows previous month.
            var showPrevMonth = function(){
                me.year = newYear;
                me.month = newMonth;

                var dom = me._createDom();
                $("#" + me.elementId).empty().append(dom);
            };

            // if set onClickPrevMonth, callback and wait until called setDates.
            // otherwise, call showPrevMonth immediately.
            if (me.onClickPrevMonth) {
                me.onClickPrevMonth({
                    setDates: setDates,
                    year: newYear,
                    month: newMonth
                });
            } else {
                me.datesHavingLink = [];
                showPrevMonth();
            }
        },

        /**
         * called when nextMonth button is clicked.
         */
        _moveNextMonth: function(){
            var me = this;

            var newYear = me.year;
            var newMonth = me.month + 1;
            if (newMonth == 13) {
                newMonth = 1;
                newYear++;
            }

            // function that user of Calendar set dates having link.
            // after set, begin to show prev month calendar.
            var setDates = function(dates){
                me.datesHavingLink = _.clone(dates);
                showNextMonth();
            };

            // function that shows previous month.
            var showNextMonth = function(){
                me.year = newYear;
                me.month = newMonth;

                var dom = me._createDom();
                $("#" + me.elementId).empty().append(dom);
            };

            // if set onClickPrevMonth, callback and wait until called setDates.
            // otherwise, call showNextMonth immediately.
            if (me.onClickNextMonth) {
                me.onClickNextMonth({
                    setDates: setDates,
                    year: newYear,
                    month: newMonth
                });
            } else {
                me.datesHavingLink = [];
                showNextMonth();
            }
        },

        /**
         * return specified scope function.
         * similar to dojo.hitch
         */
        _hitch: function(func, scope) {
            return (function(_scope){
                return function(){
                    func.apply(_scope, arguments);
                };
            })(scope);
        }
    };

    return Calendar;
});
