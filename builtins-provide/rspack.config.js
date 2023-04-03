const nodeLibsBrowser = require("node-libs-browser");
console.log("nodeLibsBrowser.process", nodeLibsBrowser.process);
/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: {
    main: "./src/main.jsx",
  },
  stats: { preset: "normal" },
  builtins: {
    html: [
      {
        template: "./index.html",
      },
    ],
    provide: {
      aaa: ["./aaa"],
      process: [nodeLibsBrowser.process],
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
    ],
  },
};
