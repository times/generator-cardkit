'use strict';

const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const shell = require('shelljs');
const uuid = require('uuid');

String.prototype.capitalize = function() {
 return this.replace( /(^|\s)([a-z])/g , (m,p1,p2) => { return p1+p2.toUpperCase(); } );
};

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-times-react-webpack') + ' generator!'
    ));

    const author = {
      name: shell.exec('git config user.name', {silent: true}).stdout || false,
      email: shell.exec('git config user.email', {silent: true}).stdout || false,
    }

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: process.cwd().split(path.sep).pop().replace(/-/g, ' ').capitalize()
    },
    {
      type: 'input',
      name: 'repo',
      message: 'Your repo name',
      default: process.cwd().split(path.sep).pop()
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description'
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author name',
      default: (author.name ? author.name.replace(/\n/g, '') : null)
    },
    {
      type: 'input',
      name: 'email',
      message: 'Author email',
      default: (author.email ? author.email.replace(/\n/g, '') : null)
    }];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  },

  writing: function () {
    const templateData = {
      name: this.props.name,
      repo: this.props.repo,
      description: this.props.description,
      gitInfo: {
        name: this.props.author,
        email: this.props.email
      }
    };

    // Define our templatable files
    const templateFiles = {
      'src': './src',
      'webpack': './webpack',
      'package.json': './package.json', 
      'README.md': './README.md'
    };

    // Define files that don't require templated data
    const staticFiles = {
      'webpack.config.js': './webpack.config.js',
      '.gitignore': './.gitignore'
    };

    // Loop over template files
    Object.keys(templateFiles).forEach((path) => {
      const destinationPath = templateFiles[path];

      this.fs.copyTpl(
        this.templatePath(path),
        this.destinationPath(destinationPath),
        templateData
      );
    });

    // Loop over static files
    Object.keys(staticFiles).forEach((path) => {
      const destinationPath = staticFiles[path];

      this.fs.copy(
        this.templatePath(path),
        this.destinationPath(destinationPath)
      );
    });
  },

  install: function () {
    this.npmInstall();
  }
});
