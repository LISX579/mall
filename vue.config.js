module.exports = {
  // devServer: {
  //   disableHostCheck: false,
  //   host: "192.168.43.173",
  //   port: 8080,
  //   https: false,
  //   hotOnly: false,
  //   proxy: null
  // },
  configureWebpack: {
    resolve: {
      alias: {
        //默认
        // '@':src
        'assets': '/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
