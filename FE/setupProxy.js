import { createProxyMiddleware } from "http-proxy-middleware";
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:9000",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/",
      },
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers["Access-Control-Allow-Origin"] =
          "http://localhost:3000";
        proxyRes.headers["Access-Control-Allow-Methods"] =
          "GET,POST,PUT,DELETE,OPTIONS";
        proxyRes.headers["Access-Control-Allow-Headers"] =
          "Content-Type,Authorization";
      },
    })
  );
};
