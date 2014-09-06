/**
 * Calendar module.
 *
 * show calendar and link of year, month, date.
 */

define(["jquery", "underscore"], function($, _){
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
         */
        show: function(options){
            var me = this;
            if (!options || !options.elementId) return;

            me.elementId = options.elementId;
            if (options.dates) {
                me.datesHavingLink = _.clone(options.dates);
            }
            var dom = me._createDom();
            $("#" + options.elementId).append(dom);
        },

        /**
         * create calendar DOM.
         */
        _createDom: function(){
            var me = this;

            // year/month.
            var captionElement = 
            (function(){
                var table = $("<table></table>");
                var tr = $("<tr></tr>");
                table.append(tr);

                var tdPrevBtn = $("<td class='prev-month'></td>");
                var prevBtn = $("<button class='btn btn-default btn-xs'><span class='glyphicon glyphicon-chevron-left'></span></button>");
                prevBtn.on("click", me._hitch(me._onClickPrevMonth, me));
                tdPrevBtn.append(prevBtn);
                tr.append(tdPrevBtn);

                var tdYearMonth = $("<td class='year-month'>" + me.year + "/" + me.month + "</td>");
                tr.append(tdYearMonth);

                var tdNextBtn = $("<td class='next-month'></td>");
                var nextBtn = $("<button class='btn btn-default btn-xs'><span class='glyphicon glyphicon-chevron-right'></button>");
                nextBtn.on("click", me._hitch(me._onClickNextMonth, me));
                tdNextBtn.append(nextBtn);
                tr.append(tdNextBtn);

                return table;
            })();

            // table.
            var datesElement =
            (function(){
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
                // what day is year/month/01 ?
                var day = (new Date(me.year + "-" + (me.month < 10 ? "0" + me.month : me.month) + "-01")).getDay();
                var currentDate = 0 - day + 1;
                // last date of month?
                var lastDate = me._getLastDate(me.year, me.month);

                while(currentDate <= lastDate) {
                    fragment += "<tr>";
                    for (var week = 0; week < 7; week++){
                        fragment += "<td"
                        + (week == 0 ? " class='week-sun'" : 
                            (week == 6 ? " class='week-sat'" : ""))
                        + ">"
                        + ((currentDate > 0 && currentDate <= lastDate)
                            ? (me.datesHavingLink[currentDate]
                                ? "<a href='" + me.datesHavingLink[currentDate] + "'>" + currentDate + "</a>"
                                : currentDate )
                            : "")
                        + "</td>";
                        currentDate++;
                    }
                    fragment += "</tr>";
                }
                fragment += "</table>";

                return $(fragment);
            })();

            var dom = $("<div></div>");
            dom.append(captionElement).append(datesElement);
            return dom;
        },

        /**
         * called when prevMonth button is clicked.
         */
        _onClickPrevMonth: function(){
            var me = this;
            // show previous month.
            me.month--;
            if (me.month == 0) {
                me.month = 12;
                me.year--;
            }

            var dom = me._createDom();
            $("#" + me.elementId).empty().append(dom);
        },

        /**
         * called when nextMonth button is clicked.
         */
        _onClickNextMonth: function(){
            var me = this;
            // show previous month.
            me.month++;
            if (me.month == 13) {
                me.month = 1;
                me.year++;
            }

            var dom = me._createDom();
            $("#" + me.elementId).empty().append(dom);
        },

        /**
         * calculate last date of year/month.
         */
        _getLastDate: function(year, month) {
            var d = new Date();
            d.setYear(year);
            d.setMonth(month);
            d.setDate(1);

            // decrement 1 day (86400000msec)
            d.setTime(d.getTime() - 86400000);

            return d.getDate();
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
