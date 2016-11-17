let config = {

  entry: './src/app.js',

  output: {
    path: './dist',
    filename: 'app.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.svg$/,
        exclude: /(node_modules)/,
        loader: 'svg-inline'
      }
    ]
  },

  plugins: []

}

module.exports = config;