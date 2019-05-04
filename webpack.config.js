var path = require('path');

module.exports = {
	mode: 'development',
	entry: __dirname + '/client/src/index.jsx',
	output: {
		path: __dirname + '/client/dist',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				use: {
					loader: 'babel-loader',
					options: {
						plugins: ['@babel/plugin-proposal-class-properties']
					}
				}
			}
		]
	}
};
