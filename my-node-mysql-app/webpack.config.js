const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./app.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      fs: require.resolve("browserify-fs"),
      http: require.resolve("stream-http"),
      zlib: require.resolve("browserify-zlib"),
      querystring: require.resolve("querystring-es3"),
      buffer: require.resolve("buffer/"),
      timers: require.resolve("timers-browserify"),
      process: require.resolve("process/browser"),
      os: require.resolve("os-browserify/browser"),
      url: require.resolve("url/"),
      net: require.resolve("net-browserify"),
      tls: require.resolve("tls-browserify"),
      async_hooks: require.resolve("async-hooks/browser"),
    },
  },
  plugins: [new NodePolyfillPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
};
