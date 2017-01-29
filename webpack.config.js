/* Configuration */

var pages = {
	"index": {
		source: "./index.ts",
		title: "Index page"
	}
};

/* Building script */

var path = require("path"),
	webpack = require("webpack"),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	HtmlWebpackPlugin = require("html-webpack-plugin");

var optimize = process.argv.indexOf('--optimize') !== -1;

var entry = {};
for (var id in pages) {
	entry[id] = pages[id].source;
}

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: entry,

	output: {
		path: path.resolve(__dirname, "public"),
		filename: "[name].js"
	},

	devtool: optimize ? undefined : "source-map",

	resolve: {
		extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
	},

	module: {
		loaders: [
			{ test: /\.ts$/, loader: "ts" },
			{ test: /\.css$/, loader: "style!css" },
			{ test: /\.styl$/, loader: "style!css!stylus" },
			{ test: /\.html$/, loader: "html", query: {minimize: true} },
			{ test: /\.png$/, loader: "url?limit=32768" },
			{ test: /\.jpg$/, loader: "url?limit=32768" }
		],

		preLoaders: [
			{ test: /\.js$/, loader: optimize ? "webpack-strip-block" : "source-map" }
		]
	},

	plugins: [
		new CleanWebpackPlugin(['public'], {
			exclude: ['bower_components', 'backend']
		}),
		new webpack.optimize.CommonsChunkPlugin("common", "common.js")
	].concat(Object.keys(pages).map(function(id) {
		return new HtmlWebpackPlugin({
			chunks: ["common", id],
			filename: id + ".html",
			template: "!!html-webpack-plugin/lib/loader.js!./templates/base.html",
			inject: "body",
			title: pages[id].title,
			suffix: optimize ? ".min" : ""
		});
	})).concat(optimize ? [
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compressor: {
				warnings: false
			}
		})
	] : [])
};
