import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";

const virtualModulesPlugin = new rspack.experiments.VirtualModulesPlugin({
	'virtual-module-a.js': 'export const a = "Hello from virtual module A";',
	  'virtual_entry.js': 'console.log("This is a virtual entry point");',
});

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["last 2 versions", "> 0.2%", "not dead", "Firefox ESR"];

setTimeout(() => {
	virtualModulesPlugin.writeModule('virtual_entry.js', 'console.log("hello world");')
}, 2000);

export default defineConfig({
//   entry: {
//     main: "./src/index.ts",
//   },
  entry: './virtual_entry.js',
  resolve: {
    extensions: ["...", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "ecmascript",
                },
              },
              env: { targets },
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [virtualModulesPlugin, new rspack.HtmlRspackPlugin({ template: "./index.html" })],
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
  experiments: {
    css: true,
	// useInputFileSystem: [/virtual-module-.*\.js$/],
  },
});
