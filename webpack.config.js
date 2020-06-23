const path = require("path");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const Dotenv = require("dotenv-webpack");
// include the js minification plugin
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
// include the css extraction and minification plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    "admin/js/fmw-match-map-admin": "./src/Admin.js",
    "public/js/fmw-match-form-public": "./src/Form.js",
    "public/js/fmw-match-map-public": "./src/Front.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname),
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      },
      {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            {
              plugins: ["@babel/plugin-proposal-class-properties"],
            },
          ],
        },
      },
      {
        test: /\.(sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new BrowserSyncPlugin({
      // Inset local WordPress proxy here
      proxy: "http://localhost:8000/",
      host: "localhost",
      port: 8001,
      files: ["**/*.php", "./src", "!./node_modules", "!./package.json"],
    }),
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: "public/css/fmw-match-map-public.css",
    }),
  ],
  optimization: {
    minimizer: [
      // enable the js minification plugin
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
      }),
      // enable the css minification plugin
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};
