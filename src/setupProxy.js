const { createProxyMiddleware } = require('http-proxy-middleware');

const hostList = {
    dev: 'http://localhost:8080'
}

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: hostList.dev,
      changeOrigin: true,
      secure: false,
      withCredentials: false,
    })
  );
};