const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/_api', '/auth'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
};
