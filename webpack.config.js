const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const prodFlag = process.env.NODE_ENV === 'production';

// read env file
Dotenv.config();

const entryParams = prodFlag ? [
  './index.jsx',
] : [
  `webpack-dev-server/client?${process.env.NODE_DEV_HOST}:${process.env.NODE_DEV_PORT}`,
  'webpack/hot/only-dev-server',
  './index.jsx',
];
const defaultParams = {
  ARCGIS_URL: JSON.stringify(process.env.ARCGIS_URL),
  ARCGIS_LAND_URL: JSON.stringify(process.env.ARCGIS_LAND_URL),
};
const defineParams = prodFlag ? { __REACT_DEVTOOLS_GLOBAL_HOOK__: '({})', ...defaultParams } : defaultParams;

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
    DEBUG: true,
  }),
  new webpack.DefinePlugin(defineParams),
  new HtmlWebpackPlugin({
    template: '../html/index-template.html',
  }),
  new MiniCssExtractPlugin({
    filename: prodFlag ? './css/[name].[hash:6].css' : './css/[name].css',
    allChunks: true,
  }),
];

module.exports = {
  entry: entryParams,
  context: path.resolve(__dirname, './', 'src'),
  output: {
    path: path.resolve(__dirname, './', 'html'),
    // dev server is not using upper path, so for dev env adding js manually in filename
    filename: prodFlag ? 'js/[name].[hash:6].js' : 'js/[name].js',
    publicPath: prodFlag ? '' : `${process.env.NODE_DEV_HOST}:${process.env.NODE_DEV_PORT}/`,
    hotUpdateChunkFilename: '[hash].hot-update.js',
  },
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    inline: true,
    port: process.env.NODE_DEV_PORT,
    overlay: { errors: true, warnings: true },
  },
  plugins: prodFlag ? [...plugins,
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CleanWebpackPlugin(['html/js', 'html/css'], {
      root: path.resolve(__dirname, './'),
      verbose: true,
      dry: false,
      exclude: [],
    }),
  ] : plugins,

  externals: {},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=../[path][name].[ext]',
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader?name=../[path][name].[ext]',
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src'],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.js', '.jsx', '.less', '.css'],
  },
  devtool: 'source-map',
  target: 'web',
};
