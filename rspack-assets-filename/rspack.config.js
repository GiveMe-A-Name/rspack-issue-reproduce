/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
	context: __dirname,
	entry: {
		main: "./src/main.jsx"
	},
	devServer: {
		devMiddleware: {
			writeToDisk: true,
		}
	},
	builtins: {
		html: [
			{
				template: "./index.html"
			}
		]
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset",
				generator: {
					filename: 'static/svg/[name].[contenthash:8].svg'
				  },
				parser: {
				  dataUrlCondition: {
					maxSize: 0
				  }
				}
			}
		]
	}
};
