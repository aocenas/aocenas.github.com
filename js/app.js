
$(function() {
  'use strict';
  
  var app = {};
  
  app.Article = Backbone.Model.extend({
    urlRoot: '/articles',
    defaults: {
      created: '19000101 0000',
      html: '',
      tags: [],
      title: ''
    },
    load: function (cb) {
      var self = this;
      $.get('articles/' + this.get('id'), function (data) {
        self.set('html', data);
        cb();
      });
    }
  });
  
  app.ArticleList = Backbone.Collection.extend({
    url: '/articles/list.json',
    model: app.Article
  });

  app.ArticleView = Backbone.View.extend({
    el: '#article',
    
    initialize: function () {
      var self = this;
      this.collection = new app.ArticleList();
      this.collection.fetch({success: function () {
        self.collection.forEach(function (article) {
          self.model = article;
        });
        self.model.load(function () {
          self.render();
        });
      }});
    },

    render: function () {

      this.$el.find('#content').html(this.model.get('html'));
      this.$el.find('.articleHeader > .articleTitle')
        .html(this.model.get('title'));
      this.$el.find('.articleHeader > .articleCreated')
        .html(this.model.get('created'));
    }
  
  });

	new app.ArticleView();

});
