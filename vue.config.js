module.exports={
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
      }
    }
  },
  lintOnSave: false,
  devServer: {
    overlay: {
      warning: false,
      errors: false
    },
    publicPath:'./'
  },
}