/* Configuration */

var pages = {
	"index": {
		source: "./index.ts"
	}
};

/* Building script */

var path = require("path"),
	webpack = require("webpack"),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	HtmlWebpackPrefixPlugin = require("html-webpack-prefix-plugin");

var entry = {};
for (var id in pages) {
	entry[id] = pages[id].source;
}

module.exports = function (env) {
	var optimize = env && env.optimize;

	return {
		context: path.resolve(__dirname, "src"),
		entry: entry,

		output: {
			path: path.resolve(__dirname, "public"),
			filename: "bundle-[name]-[hash].js"
		},

		devtool: optimize ? undefined : "source-map",

		resolve: {
			extensions: [".webpack.js", ".web.js", ".ts", ".js"]
		},

		module: {
			rules: [
				{test: /\.ts$/, loader: "ts-loader"},
				{test: /\.css$/, use: ["style-loader", "css-loader"]},
				{test: /\.styl$/, use: ["style-loader", "css-loader", "stylus-loader"]},
				{test: /\.html$/, loader: "html-loader", query: {minimize: true, attrs: false}},
				{test: /\.png$/, loader: "url-loader", options: {limit: 32768}},
				{test: /\.jpg$/, loader: "url-loader", options: {limit: 32768}},
				{test: /\.js$/, loader: optimize ? "webpack-strip-block" : "source-map-loader", enforce: "pre"}
			]
		},

		plugins: [
			new CleanWebpackPlugin(['public/*.html', 'public/*.js', 'public/*.map']),
			new webpack.optimize.CommonsChunkPlugin({name: "common", filename: "common-[hash].js"})
		].concat(Object.keys(pages).map(function (id) {
			return new HtmlWebpackPlugin({
				chunks: ["common", id],
				filename: id + ".html",
				template: "!!html-webpack-plugin/lib/loader.js!./templates/index.html",
				inject: "body",
				prefix: "",
				suffix: optimize ? ".min" : "",
				dc: new Date().getTime(),
				ga: optimize ? ga : ""
			});
		})).concat([
			new HtmlWebpackPrefixPlugin()
		]).concat(optimize ? [
			new webpack.optimize.UglifyJsPlugin({
				minimize: true
			})
		] : [])
	};
};
