/**
 * logger
 */

var log4js = require('log4js');
log4js.configure('config/log4js.json');

var loggerApp = log4js.getLogger("app");
var loggerHttp = log4js.getLogger("http");

module.exports = {
    loggerHttp: log4js.connectLogger(loggerHttp, { level: "auto" })
};
