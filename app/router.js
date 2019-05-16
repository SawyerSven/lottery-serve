'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,io} = app;
  // router.get('/', controller.index.create);
  router.resources('lottery','/lottery',controller.index)
  router.get('/lottery',controller.index.index)
  router.post('/lottery',controller.index.create)
  router.get('/lotter/:id',controller.index.show)
  router.post('/lottery/:id',controller.index.update)
  router.post('/lottery/delete/:id',controller.index.destroy)
  router.get('/api/list',controller.api.getInfo)
  router.get('/api/detail',controller.api.getAwardItem)
  router.redirect('/*','/lottery',302)
};