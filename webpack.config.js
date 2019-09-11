const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = env => {
  console.log(env)
  const ifProd = plugin =>  env.prod ? plugin : undefined;
  const removeEmpty = array => array.filter(p => !!p);

  return {
    entry: {
      app: [path.join(__dirname, 'src/')],
      vendor: ['react', 'react-dom']
    },
    output: {
      filename: '[name].[hash].js',
      path: path.join(__dirname, 'public/')
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            cacheDirectory: true
          }
        }
      ]
    },
    plugins: removeEmpty([
      new ExtractTextPlugin('style.css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: '[name].[hash].js',
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/index.html'),
        filename: 'index.html',
        inject: 'body'
      }),
      ifProd(new webpack.optimize.DedupePlugin()),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          'warnings': false
        },
        sourceMap: false
      })),
      ifProd(new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production")
      }))
    ])
  };
};
