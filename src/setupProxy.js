const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://smart-guide-app.herokuapp.com',
        changeOrigin: true,
        pathRewrite: {'^/api' : ''}
      })
    );
  };

//   http://smart-guide-app.herokuapp.com