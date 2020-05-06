const path = require('path');

module.exports = {
//   entry: './src/index.js',
	entry: {
		'admin/js/adminPage': './src/admin/index.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname),
	},
	resolve: { extensions: ['*', '.js', '.jsx'] },
	module: {
		rules: [
			{
				test:/\.(js|jsx)$/,
				exclude:/node_modules/,
				loaders: ["react-hot-loader/webpack", "babel-loader"],
				// use: {
				// 		loader:'babel-loader',
				// }
			},
		]
	},
};