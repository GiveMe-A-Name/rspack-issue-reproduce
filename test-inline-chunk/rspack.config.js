const { InlineChunkHtmlPlugin } = require('./InlineChunkHtmlPlugin');
const HtmlRspackPlugin = require('@rspack/plugin-html').default;
// console.log('HtmlRspackPlugin', HtmlRspackPlugin);
/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
	context: __dirname,
	entry: {
		main: "./src/main.jsx"
	},
	builtins: {},
	optimization: {
		runtimeChunk: {
			name: 'builder-runtime'
		  },
		minimize: true
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset"
			}
		]
	},
	plugins: [
		new HtmlRspackPlugin({
			template: "./index.html"
		}),
		new InlineChunkHtmlPlugin(
			HtmlRspackPlugin,
			{
				tests: [
				  /builder-runtime([.].+)?\.js$/
				],
				distPath: {
				  js: '',
				  css: ''
				}
			  }
		),
		new class TestAssets {
			apply(complier) {
				complier.hooks.afterEmit.tapPromise('TestAssets', async (compilation) => {
					const assets = compilation.getAssets();
					console.log('assets', Object.keys(assets));
				})
			}
		}
	]
};
