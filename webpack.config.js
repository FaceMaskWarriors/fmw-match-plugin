const path = require('path');

module.exports = {
//   entry: './src/index.js',
	entry: {
		'admin/js/adminPage': './src/admin/index.js',
		// 'admin/js/admin' : './src/admin/index.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname),
	},
};