const args = require('minimist')(process.argv.slice(2));

const base = require('./webpack/base.config');

let env = 'dev';
if(args.env) {
  switch(args.env) {
    case 'dist':
      env = 'dist';
      break;
  }
}

const getConfig = (env) => {
  return require('./webpack/' + env + '.config.js');
}

module.exports = getConfig(env);