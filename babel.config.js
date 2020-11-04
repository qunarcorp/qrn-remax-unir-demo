const env = process.env.RUNTIME_ENV || 'rn';
const rnBabelConfig = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
    };
};
const wechatBabelConfig = function (api) {
    api.cache(true);
    return {};
};
module.exports = env === 'rn' ? rnBabelConfig : wechatBabelConfig;
