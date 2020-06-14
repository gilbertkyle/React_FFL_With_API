module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|jpg)$/,
        loaders: ["file-loader?hash=sha512&digest=hex&name=[hash].[ext]", "image-webpack-loader"]
      }
    ]
  }
};
