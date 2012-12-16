var APP = APP || {};

APP.Article = Backbone.Model.extend({
  urlRoot: '/articles',
  defaults: {
    created: '19000101 0000',
    html: '',
    tags: [],
    title: ''
  },
  /**
   * Load the text of the article, this plain html and not a JSON as to make
   * it easier to write them. Because of this the loading of the text is
   * separate logic.
   *
   * @param {function} cb a callback function, does not receive any params
   *                      for now.
   */
  load: function (cb) {
    var self = this;
    $.get('articles/' + this.get('id'), function (data) {
      self.set('html', data);
      cb();
    });
  }
});

/**
 * Collection of articles. All articles are stored in list.json file so as to
 * crudely simulate a REST API.
 */
APP.ArticleList = Backbone.Collection.extend({
  url: '/articles/list.json',
  model: APP.Article
});
