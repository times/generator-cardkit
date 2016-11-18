const webpack = require('webpack');

const path = require('path');
const _ = require('lodash');
const args = require('minimist')(process.argv.slice(2));

const base = require('./base.config');

let srcPath = path.join(__dirname, './app');

let config = _.merge(base, {});

config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  mangle: {
    except: ['CardKit']
  }
}));

// Set process.env.NODE_ENV to production
config.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
}));

module.exports = config;