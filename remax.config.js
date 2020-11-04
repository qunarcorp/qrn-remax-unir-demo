const TerserPlugin = require('terser-webpack-plugin');

const alaisToAdd = {
  'react-native': '@qnpm/rn-remax-mirror',
  './basicsAlert$': '@qnpm/rn-remax-mirror/lib/exports/BasicsAlert',
  './Portal$': '@qnpm/rn-remax-mirror/lib/exports/Portal',
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
