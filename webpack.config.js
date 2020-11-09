const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${__dirname}/public/index.html`,
    filename: 'index.html',
    inject: true,
});
const webpack = require('webpack');
const runTimeEnv = 'web';

function postCssLoader() {
    return {
        loader: require.resolve('postcss-loader'),
        options: {
            ident: 'postcss',
            plugins: [require(require.resolve('autoprefixer'))({
                overrideBrowserslist: [
                    'ie >= 9',
                    '> 1%',
                    'iOS 7',
                    'last 3 iOS versions'
                ]
            })]
        }
    }
}

function createCssLoader(test, addLoader) {
    const loader = {
        test,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    hmr: process.env.NODE_ENV !== 'production'
                }
            },
            require.resolve('css-loader'),
            postCssLoader()
        ]
    }
    if (addLoader) {
        loader.use.push(addLoader)
    }
    return loader
}

const cssName = process.env.NODE_ENV === 'production' ? '[name]@[chunkhash].css' : '[name]@dev.css'

module.exports = {
    mode:'development',
    resolve: {
        alias: {
            'lodash': 'lodash-es',
            'react-native$': 'react-native-web',
        },
        extensions: ['.web.ts','.ts', '.web.tsx', '.tsx','.web.js', '.js', '.web.jsx','.jsx','.json', '.less', '.scss', '.css']
    },
    // 档案起始点从 entry 进入，因为是阵列所以也可以是多个档案
    entry: [
        './App.web.js',
    ],
    // output 是放入产生出来的结果的相关参数
    output: {
        path: `${__dirname}/prd`,
        filename: 'index_bundle.js',
    },
    module: {
        // loaders 則是放想要使用的 loaders，在这边是使用 babel-loader 将所有 .js（这边用到正则）相关文件（排除了 npm 安裝的套件位置 node_modules）编译成浏览器可以阅读的 JavaScript。preset 则是使用的 babel 编译规则，这边使用 react、es2015。若是已经单独使用 .babelrc 作为 presets 設定的话，则可以省略 query
        rules:  [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: require.resolve('babel-loader'),
                    options: {
                        presets: [[
                            require.resolve('@babel/preset-env'),
                            {
                                modules: false,
                                loose: true,
                            }
                        ],
                        require.resolve('@babel/preset-react'),
                        require.resolve('@babel/preset-flow')
                        ],
                        plugins:[
                            "react-hot-loader/babel",
                            [require.resolve('@babel/plugin-transform-runtime'),{
                                helpers: false,
                                regenerator: true, }],
                            require.resolve('@babel/plugin-transform-object-assign'),
                            [require.resolve("@babel/plugin-proposal-decorators"), { legacy: true }],
                            require.resolve('@babel/plugin-proposal-class-properties'),
                            require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
                            require.resolve('@babel/plugin-transform-flow-strip-types'),
                            require.resolve('@babel/plugin-proposal-optional-chaining'),
                            require.resolve('@babel/plugin-syntax-class-properties')
                        ]
                    }
                }],
            },
            {
                test: /\.(gif|jpe?g|png|svg)$/,
                use: {
                    loader: require.resolve('url-loader'),
                    options: {
                        name: 'img/[name].[ext]'
                    }
                }
            },
            createCssLoader(/\.css$/),
            createCssLoader(/\.less$/, require.resolve('less-loader')),
            createCssLoader(/\.scss$/, {
                loader: require.resolve('sass-loader'),
                options: {
                    webpackImporter: false,
                    implementation: require(require.resolve('sass'))
                }
            })
        ],
    },
    // devServer 则是 webpack-dev-server 设定
    devServer: {
        inline: true,
        port: 3001,
    },
    // plugins 放置所使用的外挂
    plugins: [
        HTMLWebpackPluginConfig,
        new webpack.DefinePlugin({
            // 定一些变量打包的时候会动态替换，例如开发和线上使用不同的请求地址
            // 一定要JSON.stringify 吗，是的，因为是直接替换，或者 "true"
            'process.env.RUNTIME_ENV': JSON.stringify(runTimeEnv)
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            // filename: 'f_[name].css',
            filename: cssName,
            chunkFilename: cssName,
            ignoreOrder: true // Enable to remove warnings about conflicting order
        }),
    ],
};
