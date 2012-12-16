$(function() {
  'use strict';

  var app = {};

  /**
   * Compiles a template functions, stores it in app.templates and returns it.
   *
   * @param {string} id id of the element where the template can be found
   */
  function getTemplate (id) {
    id = (id[0] === '#')? id : '#' + id;

    if(!app.templates) {
      app.templates = Object.create(null);
    }
    if(!app.templates[id]){
      app.templates[id] = _.template(
        $(id+ '.template').html(), null, {variable: 'article'}
      );
    }
    return app.templates[id];
  }

  app.Article = Backbone.Model.extend({
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
  app.ArticleList = Backbone.Collection.extend({
    url: '/articles/list.json',
    model: app.Article
  });

  app.ArticleView = Backbone.View.extend({
    className: 'articleContainer',
    tagName: 'div',

    render: function () {
      this.$el.html(
        getTemplate('articleTemplate')(this.model.toJSON())
      );
    }
  });

  app.BlogView = Backbone.View.extend({
    el: '#mainContent',

    /**
     * Initialize main view by getting all articles by collection.fetch(), then
     * manualy loading texts of the articles. After that view is rendered.
     */
    initialize: function () {
      var self = this;
      var q = queue();
      this.collection = new app.ArticleList();
      this.collection.fetch({
        success: function () {
          self.collection.forEach(function (article) {
            q.defer(_(article.load).bind(article));
          });
          q.await(_(self.render).bind(self));
        }
      });
    },

    /**
     * Render main view by creating subview for each article.
     */
    render: function () {
      this.collection.each(function (model, index) {
        var articleView = new app.ArticleView({model: model});
        this.$el.append(articleView.el);
        articleView.render();
      }, this);
    }
  })

	new app.BlogView();

});
