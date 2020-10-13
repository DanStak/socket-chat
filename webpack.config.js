const path = require( 'path' );
const magicImporter = require('node-sass-magic-importer');
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );


module.exports = {
  entry: [path.join(__dirname, 'src/index')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.web.js', '.mjs', '.js', '.json', '.vue'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    hot: true,
    port: 3000,
    disableHostCheck: true,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_module/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: 'file-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              importer: magicImporter(),
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve( __dirname, 'public/index.html' ),
      filename: 'index.html'
    })
  ]
};
