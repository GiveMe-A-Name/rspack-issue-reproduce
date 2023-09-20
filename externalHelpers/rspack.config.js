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
	},
	devServer: {
		devMiddleware: {
			writeToDisk: true,
		}
	},
	experiments: {
		asyncWebAssembly: true,
		rspackFuture: {
		  disableTransformByDefault: true,
		  newResolver: false,
		  newTreeshaking: false
		}
	},
	devtool: 'cheap-source-map',
	module: {
		rules: [
			{
				test: /\.(js|mjs|cjs|jsx)$|\.(ts|mts|cts|tsx)$/,
				type: 'javascript/auto',
			    include: [/src/],
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								externalHelpers: true,
								parser: {
									tsx: true,
									syntax: 'typescript',
									decorators: true
								},
								transform: {
									legacyDecorator: true,
									decoratorMetadata: true
								  }
							},
							sourceMaps: true,
						},
						ident: "builtin-swc-loader"
					}
				]
			},
			{
				test: /\.svg$/,
				type: "asset"
			},
			{
				test: /\.s[ac]ss$/i,
				use: [{ loader: "sass-loader" }],
				type: "css"
			}
		]
	}
};
