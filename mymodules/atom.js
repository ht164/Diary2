/**
 * generate ATOM feed.
 *
 * method interface is similar to node-rss.
 */

var XML = require('xml');
var _ = require('underscore');

function Atom(options, items) {
  options = options || {};

  // properties.
  this.title = options.title || "";
  this.description = options.description || "";
  this.updated = options.updated || "";
  this.id = options.id;
  this.site_url = options.site_url;
  this.feed_url = options.feed_url;

  this.items = items || [];
}

/**
 * functions.
 */
Atom.prototype = {
  /**
   * add item.
   */
  item: function(options) {
    var me = this;
    options = options || {};
    var item = {
      title: options.title || "",
      link: options.url || "",
      id: options.id,
      updated: options.date || "",
      content: options.description,
      summary: options.summary
    };
    me.items[me.items.length] = item;

    return me;
  },

  /**
   * generate xml string.
   */
  xml: function(indent) {
    var me = this;
    return '<?xml version="1.0" encoding="UTF-8"?>\n'
      + XML(me._generateXml(), indent);
  },

  /**
   * generate pre-converted object for XML module.
   */
  _generateXml: function() {
    var me = this;

    var feedXml = [
      { _attr: {
        xmlns: "http://www.w3.org/2005/Atom"
      }},
      { id: me.id },
      { title: me.title },
      { updated: me.updated ? me.updated.toISOString() : "" },
      { link: { _attr: { href: me.site_url }}}
    ];

    _.each(me.items, function(item) {
      var itemXml = [
        { id: item.id },
        { title: { _cdata: item.title }},
        { link: { _attr: { href: item.link }}},
        { updated: item.updated ? item.updated.toISOString() : "" },
        { summary: { _cdata: item.summary }},
        { content: { _cdata: item.content }}
      ];
      feedXml.push({ entry: itemXml });
    });

    return {
      feed: feedXml
    };
  }
};

module.exports = Atom;
