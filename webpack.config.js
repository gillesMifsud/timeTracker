const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: { app: './src/index.js' },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: [new CleanWebpackPlugin({ cleanStaleWebpackAssets: false })],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                // Apply rule for .sass, .scss or .css files
                test: /\.(sa|sc|c)ss$/,

                // Set loaders to transform files.
                // Loaders are applying from right to left(!)
                // The first loader will be applied after others
                use: [
                    {
                        loader: 'style-loader' // inject CSS to page
                    },
                    {
                        // This loader resolves url() and @imports inside CSS
                        loader: 'css-loader'
                    },
                    {
                        // Then we apply postCSS fixes like autoprefixer and minifying
                        loader: 'postcss-loader'
                    },
                    {
                        // First we transform SASS to standard CSS
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass')
                        }
                    }
                ]
            }
        ]
    },
    mode: 'development'
};
