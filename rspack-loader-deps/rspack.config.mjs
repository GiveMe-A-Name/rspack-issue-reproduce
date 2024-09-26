export default {
  entry: {
    main: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["css-loader"],
        type: "javascript/auto",
      },
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /\.js$/,
        loader:
          "/Users/bytedance/Desktop/test-project/test-rspack/rspack-issue-reproduce/rspack-loader-deps/loader.js",
      },
      //   {
      //     test: /\.js$/,
      //     use: [
      //       {
      //         loader: "builtin:swc-loader",
      //         options: {
      //           jsc: {
      //             parser: {
      //               syntax: "ecmascript",
      //             },
      //           },
      //           env: { targets },
      //         },
      //       },
      //     ],
      //   },
    ],
  },
  // plugins: [new rspack.HtmlRspackPlugin({ template: "./index.html" })],
  experiments: {
    css: true,
  },
};
