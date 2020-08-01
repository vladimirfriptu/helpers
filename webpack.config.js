const path = require('path');
const HappyPack = require('happypack');
const nodeExternals = require('webpack-node-externals');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  mode: 'production',
  context: __dirname,

  entry: ['./src/index'],

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  resolve: {
    modules: ["node_modules", "src"],
    extensions: ['.ts', '.js', '.tsx'],
  },

  stats: {
    children: false,
    colors: true,
    errors: true,
    errorDetails: true,
  },

  plugins: [
    new HappyPack({
      id: 'happybabel',
      loaders: [
        {
          loader: 'babel-loader',
          options: { babelrc: true, cacheDirectory: true },
        },
      ],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.WEBPACK_ANALYZE ? 'static' : 'disabled',
      reportFilename: './analyze/index.html',
    }),
  ],

  module: {
    rules: [
      {
        use: ['happypack/loader?id=happybabel'],
        test: /\.(t|j)sx?$/,
        include: path.join(__dirname, './src'),
      },
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: [/node_modules/],
        include: [/src/],
      },
    ],
  },

  externals: [ nodeExternals({ whitelist: [/^lodash/] }) ],
};

module.exports = config;
