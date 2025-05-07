import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
  entry: {
    main: "./src/index.js",
  },
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },
  module: {
    rules: [
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
    ],
  },
  plugins: [new rspack.HtmlRspackPlugin({ template: "./index.html" })],
  optimization: {
    minimize: false,
    moduleIds: "named",
  },
  experiments: {
    css: true,
  },
});
