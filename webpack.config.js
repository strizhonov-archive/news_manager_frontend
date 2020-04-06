const HtmlWebPackPlugin = require("html-webpack-plugin");

const config = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ],
    devServer: {
        proxy: {
            "/news_management":{
                target:"http://localhost:8080/",
                secure:"false"
            }
        },
        historyApiFallback: true,
        port: 3000
    },
};

module.exports = config;