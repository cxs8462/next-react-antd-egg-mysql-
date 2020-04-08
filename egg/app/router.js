'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/index/router')(app)
  require('./router/admin/admin')(app)
};
