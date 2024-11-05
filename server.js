// server.js
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const url = require("url");

const app = express();
const PORT = process.env.PORT || 3000;

// プロキシリクエストの処理
app.use("/proxy", (req, res, next) => {
  const targetUrl = req.query.url; // クエリパラメータからターゲットURLを取得
  
  if (!targetUrl) {
    return res.status(400).send("ターゲットURLが指定されていません。");
  }
  
  // 動的にプロキシを設定
  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: {
      "^/proxy": "", // /proxy パスを削除
    },
  })(req, res, next);
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
