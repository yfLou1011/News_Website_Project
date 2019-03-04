var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  devServer:{
    historyApiFallback:true
  },
  context: path.join(__dirname),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/js/root.js",
  module: {
    rules: [
      { //ES6、JSX处理
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use:{
          loader: 'babel-loader',
          options: {
            presets: ["react", "es2015"],
            plugins: [
              [  "import",
                {libraryName: "antd", style: 'css'}
              ] // antd按需加载
            ]
          }
        },

      },
      // 对CSS
      { test: /\.css$/,
        loader:"style-loader!css-loader?modules",
        exclude: /node_modules/
      },
      {//antd样式处理
        test:/\.css$/,
        exclude:/src/,
        use:[
            { loader: "style-loader"},
            { loader: "css-loader",
              options:{importLoaders:1}
            }
        ]
      }
    ]
  },
  output: {
    path: __dirname,
    filename: "./src/bundle.js"
  },
  // plugins: debug ? [] : [
  //   new webpack.optimize.DedupePlugin(),
  //   new webpack.optimize.OccurenceOrderPlugin(),
  //   new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  // ],
};
