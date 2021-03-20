module.exports = {
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
