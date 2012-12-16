var APP = APP || {};

/**
 * Compiles a template functions, stores it in app.templates and returns it.
 *
 * @param {string} id id of the element where the template can be found
 */
APP.getTemplate = function (id) {
  id = (id[0] === '#')? id : '#' + id;

  if(!this.templates) {
    this.templates = Object.create(null);
  }
  if(!this.templates[id]){
    this.templates[id] = _.template(
      $(id+ '.template').html(), null, {variable: 'article'}
    );
  }
  return this.templates[id];
};
