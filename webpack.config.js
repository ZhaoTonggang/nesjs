let path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: {
    nesjs: "./src/index.js",
    "nesjs.min": "./src/index.js",
  },
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "nesjs",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        exclude: /node_modules/,
        use: [
          {
            loader: "eslint-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new UglifyJsPlugin({
      include: /\.min\.js$/,
      sourceMap: true,
    }),
  ],
};
