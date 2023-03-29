/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
	context: __dirname,
	entry: {
		main: "./src/main.jsx"
	},
	builtins: {
		html: [
			{
				template: "./index.html"
			}
		],
		presetEnv: {
			targets: [
			  '> 0.01%',
			  'not dead',
			  'not op_mini all'
			],
			coreJs: '3.26'
		  }
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset"
			}
		]
	}
};
