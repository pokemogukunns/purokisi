// api/proxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    res.status(400).send("ターゲットURLが指定されていません。");
    return;
  }

  // createProxyMiddlewareを設定
  const proxy = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: { "^/api/proxy": "" },
  });

  // プロキシを実行
  return proxy(req, res);
};
