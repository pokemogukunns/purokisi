const { createProxyMiddleware } = require("http-proxy-middleware");

const proxy = createProxyMiddleware({
  changeOrigin: true,
  pathRewrite: { "^/api/proxy": "" },
});

module.exports = async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    res.status(400).send("ターゲットURLが指定されていません。");
    return;
  }

  // プロキシのターゲットを設定
  req.url = targetUrl;

  // プロキシを実行
  return new Promise((resolve, reject) => {
    proxy(req, res, (result) => {
      if (result instanceof Error) {
        reject(result);
      } else {
        resolve(result);
      }
    });
  });
};
