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
Atom.properties = {
  /**
   * add item.
   */
  item: function(options) {
    var me = this;
    options = options || {};
    var item = {
      title: options.title || "",
      url: options.url || "",
      id: options.id,
      updated: options.date || "",
      summary: options.description
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
      + XML(me._generateXML(), indent);
  },

  /**
   * generate pre-converted object for XML module.
   */
  _generateXml: function() {
    var me = this;

    var feed = {
      id: me.id,
      title: me.title,
      updated: me.updated,
      link: { _attr: { href: me.site_url }}
    };

    var entry = [];
    _.each(me.items, function(item) {
      entry.push({
        id: item.id,
        title: item.title,
        link: item.url,
        updated: item.updated,
        summary: item.summary
      });
    });

    return {
      feed: feed
    };
  }
};

module.exports = Atom;
