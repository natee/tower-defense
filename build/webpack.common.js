const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    app: [
      // './src/js/rewrite/game.js',
      './src/js/rewrite/run.js',

      // './src/js/td.js',
      // './src/js/td-lang.js',
      // './src/js/td-event.js',
      // './src/js/td-stage.js',
      // './src/js/td-element.js',
      // './src/js/td-obj-map.js',
      // './src/js/td-obj-grid.js',
      // './src/js/td-obj-building.js',
      // './src/js/td-obj-monster.js',
      // './src/js/td-obj-panel.js',
      // './src/js/td-data-stage-1.js',
      // './src/js/td-cfg-buildings.js',
      // './src/js/td-cfg-monsters.js',
      // './src/js/td-render-buildings.js',
      // './src/js/td-msg-zh.js',
      // './src/js/td-walk.js',
      // './src/js/td-run.js',
    ]
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      { 
        test   : /.js$/,
        loader : 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  }
};