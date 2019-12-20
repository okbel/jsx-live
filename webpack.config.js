const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = env => {
  const ifProd = plugin =>  !env.dev ? plugin : undefined;
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
      rules: [
        {
          test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                ]
        },
        {
          test: /\.json$/,
          use: 'json-loader'
        },
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader" //Usa este loader
          }
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        }
      ]
    },
    plugins: removeEmpty([
      new MiniCssExtractPlugin({
        filename: 'style.css'
      }),
      new HtmlWebPackPlugin({
        template: path.join(__dirname, 'src/index.html'),
        filename: 'index.html',
        inject: 'body'
      }),
      ifProd(new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production")
      }))
    ]),
    optimization: {
      splitChunks: {
        minChunks: Infinity,
        cacheGroups: {
          vendors: {
            name: 'vendor',
            filename: '[name].[hash].js',
          }
        }
      },
      minimize: true
    },
    mode: env.dev ? 'development' : 'production'
  };
};
