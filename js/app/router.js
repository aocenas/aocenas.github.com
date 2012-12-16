var APP = APP || {};

APP.Router = Backbone.Router.extend({
  routes: {
    'blog':              'blogRoute',
    'blog/:year':        'blogRoute',
    'blog/:year/:month': 'blogRoute',
    '*path':             'defaultRoute'
  },
  
  blogRoute: function (year, month) {
    
    if (APP.views.current !== APP.views['BlogView']) {
      $('#menu li').removeClass('active');
      $('#blog').addClass('active');

      if (APP.views.current) {
        APP.views.current.hide();
      }
      APP.views['BlogView'].render();
      APP.views.current = APP.views['BlogView'];
    }
  },

  defaultRoute: function (path) {
    if (APP.views.current !== APP.views['MeView']) {
      $('#menu li').removeClass('active');
      $('#me').addClass('active');
      if (APP.views.current) {
        APP.views.current.hide();
      }
      APP.views['MeView'].render();
      APP.views.current = APP.views['MeView'];
    }
  },

});

APP.views = {};
APP.views['BlogView'] = new APP.BlogView();
APP.views['MeView'] = new APP.MeView();
APP.views.current = null;
//APP.views['BlogView'] = new BlogView();


