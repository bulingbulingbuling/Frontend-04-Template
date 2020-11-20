//node 配置
module.exports = {
  entry: "./main.js",
  module: {
    rules: [
      {
        test:/\.js$/, 
        use:{
          loader:"babel-loader",
          options: {
            presets:["@babel/preset-env"],
            plugins:[["@babel/plugin-transform-react-jsx",{pragma:"createElement"}]]
          }
        }
      }
    ]
  },
  //开发者模式
  mode: "development"
};
