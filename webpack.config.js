const nodeExternals = require('webpack-node-externals')
const path = require('path')
const slsw = require('serverless-webpack')
const packageJson = require('./package.json')
const _ = require('lodash')

console.log(slsw.lib.entries)

module.exports = {
  entry: _.isEmpty(slsw.lib.entries) ? { handler: './handler.js'} : slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  //mode: 'development',
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, '.webpack'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ["styled-jsx/babel"],
          },
        }],
        //loader: 'babel-loader',
        //options: {
          //presets: ['env','react','latest'],
        //}
      },
    ],
  },
  target: 'node',
  externals: ['aws-sdk'],
}
