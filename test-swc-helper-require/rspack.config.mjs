import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
  entry: {
    main: "./src/index.js",
  },
  mode: "development",
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },
  module: {},
  optimization: {
    minimize: false,
    moduleIds: "named",
  },
  experiments: {
    css: true,
  },
});
