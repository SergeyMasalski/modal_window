const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';
const isProd = !isDev;

const pattern = ext => {
  return isDev ? `[name].${ext}` : `[name].[hash].${ext}`;
};

const config = {
  context: path.resolve(__dirname, 'src'),

  mode: 'development',

  entry: {
    main: './main.js',
  },

  output: {
    filename: pattern('js'),
    path: path.resolve(__dirname, 'dist'),
  },

  watch: isDev,

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    minimize: isProd,
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),

    new MiniCSSExtractPlugin({
      filename: pattern('css'),
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    port: 4200,
    hot: isDev,
  },

  devtool: isDev ? 'source-map' : false,

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
};

module.exports = config;
