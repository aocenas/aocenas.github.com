var APP = APP || {};

APP.ArticleView = Backbone.View.extend({
  className: 'articleContainer',
  tagName: 'div',

  render: function () {
    this.$el.html(
      APP.getTemplate('articleTemplate')(this.model.toJSON())
    );
  }
});

APP.BlogView = Backbone.View.extend({
  el: '#blogContent',

  /**
   * Initialize main view by getting all articles by collection.fetch(), then
   * manualy loading texts of the articles. After that view is rendered.
   *
   * @param {object} options Hash of options, only render is recognized. If
   *                         true view is rendered right after initialisation.
   */
  initialize: function (options) {
    options = options || {};
    var self = this;
    self.q = queue();
    this.collection = new APP.ArticleList();
    this.collection.fetch({
      success: function () {
        self.collection.forEach(function (article) {
          self.q.defer(_(article.load).bind(article));
        });
        self.q.await(function () {
          if (options.render) {
            self.render();
          }
          self.dataLoaded = true;
        });
      }
    });
  },

  /**
   * Render main view by creating subview for each article. View is rendered 
   * only if the data were already loaded.
   */
  render: function () {
    if (this.hidden) {
      this.$el.show();
      return;
    }
    if (this.dataLoaded) {
      this._render.apply(this);
    } else {
      this.q.await(_(this._render).bind(this));
    }
  },

  _render: function  () {
    this.collection.each(function (model, index) {
      var articleView = new APP.ArticleView({model: model});
      this.$el.append(articleView.el);
      articleView.render();
    }, this);
  },

  hide: function () {
    this.$el.hide();
    this.hidden = true;
  }
});

APP.MeView = Backbone.View.extend({
  el: '#meContent',
  initialize: function (options) {
    options = options || {};
    var self = this;
    
    this.defered = $.get('articles/me', function (data) {
      self.data = data;
    });
    if (options.render) this.defered.done(function () { self.render(); });
  },

  render: function () {
    if (this.hidden) {
      this.$el.show();
      return;
    }
    if (this.data) {
      this._render.apply(this);
    } else {
      this.defered.done(_(this._render).bind(this));
    }
  },

  _render: function () { 
    this.$el.html(this.data); 
  },

  hide: function () {
    this.$el.hide();
    this.hidden = true;
  }
});

