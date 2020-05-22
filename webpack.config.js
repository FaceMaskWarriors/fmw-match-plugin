const path = require("path");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const Dotenv = require("dotenv-webpack");

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
        use: [
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
        ],
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
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
};
