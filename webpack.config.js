const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        "bundle": [
            "./client-src/settings",
            "./client-src/create-extent-checkboxes",
            "./client-src/polynom-render",
            "./client-src/set-extents",
            "./client-src/ajax-request"
        ]
    },
    output: {
        filename: "./client/[name].js"
    },

    plugins: [
        new CopyWebpackPlugin([
            {from: "./client-src/index.html", to: "./client/index.html"},
            {from: "./client-src/css/style.css", to: "./client/css/style.css"}
        ]),
        //include jquery for all modules
        new webpack.ProvidePlugin({
            $: "jquery"
        })
    ],

    watch: true
};
