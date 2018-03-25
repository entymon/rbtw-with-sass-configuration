const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  entry: './src/App.tsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules|bower_components/
      },
      {
        test: /\.jsx|js$/,
        exclude: /node_modules|bower_components/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test:/\.(s*)css$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: extractPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'typings-for-css-modules-loader?modules&sass',
              options: {
                sourceMap: true,
                modules: true,
                camelCase: true,
                namedExport: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: {
          loader: "url-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.jsx', '.js', '.json', '.css', '.scss' ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true
  },
  plugins: [
    htmlPlugin,
    extractPlugin
  ]
};
