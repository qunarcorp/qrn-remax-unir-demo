const alaisToAdd = {
  'react-native': 'qrn-remax-unir',
  './basicsAlert$': 'qrn-remax-unir/lib/exports/BasicsAlert',
  './Portal$': 'qrn-remax-unir/lib/exports/Portal',
};
module.exports = {
  one: true,
  pxToRpx: false,
  compressTemplate: true,
  output: 'dist/' + process.env.REMAX_PLATFORM,
  configWebpack({config, webpack}) {
    process.env.RUNTIME_ENV = 'wechat';
    config.plugin('custom-define').use(webpack.DefinePlugin, [
      {
        'process.env.RUNTIME_ENV': JSON.stringify('wechat'),
        'process.env.NODE_ENV': JSON.stringify('production')
      }
    ]);
    config.plugin('md5Module').use(webpack.HashedModuleIdsPlugin);
    config.resolve.alias.merge(alaisToAdd);
  }
};
