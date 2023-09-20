/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: {
    main: "./src/main.jsx",
  },
  builtins: {
    html: [
      {
        template: "./index.html",
      },
    ],
  },
  output: {
    assetModuleFilename: "static/[name].[contenthash:8][ext]",
  },
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },
  experiments: {
    asyncWebAssembly: true,
    rspackFuture: {
      disableTransformByDefault: true,
      newResolver: false,
      newTreeshaking: false,
    },
  },
  devtool: "cheap-source-map",
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|mjs|cjs|jsx)$|\.(ts|mts|cts|tsx)$/,
            type: "javascript/auto",
            include: [/src/],
            use: [
              {
                loader: "builtin:swc-loader",
                options: {
                  isModule: "unknown",
                  jsc: {
                    externalHelpers: true,
                    parser: {
                      tsx: true,
                      syntax: "typescript",
                      decorators: true,
                    },
                    transform: {
                      legacyDecorator: true,
                      decoratorMetadata: true,
                    },
                  },
                  sourceMaps: true,
                },
                ident: "builtin-swc-loader",
              },
            ],
          },
          {
            test: /\.svg$/,
            type: "asset",
          },
          {
            test: /\.css$/,
            type: "css",
          },
          {
            test: /\.s[ac]ss$/i,
            oneOf: [
              {
                sideEffects: true,
                exclude: [/index\.scss$/],
                use: [{ loader: "sass-loader" }],
                type: "css",
              },
            ],
          },
          {
            exclude: [
              /\.(js|mjs|cjs|jsx)$/,
              /\.(ts|mts|cts|tsx)$/,
              /\.html$/,
              /\.json$/,
            ],
            type: "asset/resource",
          },
        ],
      },
    ],
  },
};
