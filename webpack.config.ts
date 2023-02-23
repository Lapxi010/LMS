const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const mode = process.env.NODE_ENV

module.exports = () => {
    const config: any = {
        entry: {
            index: "./src/index.ts",
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].[contenthash].js",
        },
        target: "web",
        devServer: {
            compress: true,
            hot: true,
            port: 3333,
            historyApiFallback: true,
            open: true,
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx", "json"],
            alias: {
                "@fonts": path.resolve(__dirname, "public/fonts"),
                "@pages": path.resolve(__dirname, "src/pages"),
                "@components": path.resolve(__dirname, "src/components"),
                "@store": path.resolve(__dirname, "src/store"),
                "@utils": path.resolve(__dirname, "src/utils"),
                "@hooks": path.resolve(__dirname, "src/hooks"),
                "@api": path.resolve(__dirname, "src/api"),
                "@modules": path.resolve(__dirname, "src/modules"),
            },
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
                    type: "asset/resource",
                },
                {
                    test: /\.(ts|tsx|js|jsx)$/i,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
                        }
                    }
                },
                {
                    test: /\.(css|sass)$/,
                    use: [
                        require.resolve("style-loader"),
                        {
                            loader: require.resolve("css-loader"),
                            options: {
                                modules: {
                                    auto: (p) => p.indexOf("node_modules") < 0,
                                },
                            },
                        },
                        require.resolve("sass-loader")
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html",
            }),
            new CleanWebpackPlugin(),
        ],
    }

    if (mode === "development") {
        config.mode = "development"
        config.devtool = "source-map"
    } else {
        config.mode = "production"
        config.optimization = {
            minimize: true,
            concatenateModules: true,
            moduleIds: "deterministic",
            usedExports: true,
            splitChunks: {
                minChunks: 2,
                chunks: "all",
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                    },
                },
            },
            runtimeChunk: {
                name: "runtime",
            },
        }
    }
    return config
}
