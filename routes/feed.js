var express = require('express');
var router = express.Router();
var Controller = require('../mymodules/controller');

/* get RSS1.0 */
router.get('/rss10.rdf', function(req, res) {
    var controller = new Controller();
    controller.getRss10(req, res);
});

/* get RSS2.0 */
router.get('/rss20.xml', function(req, res) {
    var controller = new Controller();
    controller.getRss20(req, res);
});

/* get Atom */
router.get('/atom.xml', function(req, res) {
    var controller = new Controller();
    controller.getAtom(req, res);
});

module.exports = router;