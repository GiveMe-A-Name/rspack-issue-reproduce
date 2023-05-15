/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * modified from https://github.com/facebook/create-react-app/blob/master/packages/react-dev-utils/InlineChunkHtmlPlugin.js
 */
const { join } = require('path');

const isString = (str) => {
  return typeof str === 'string';
}

const addTrailingSlash = (s) =>
  s.endsWith('/') ? s : `${s}/`;

class InlineChunkHtmlPlugin {
  // name: string;

  // tests: RegExp[];

  // distPath: InlineChunkHtmlPluginOptions['distPath'];

  // inlinedAssets: Set<string>;

  // htmlPlugin: typeof HtmlWebpackPlugin;

  constructor(
    htmlPlugin,
    { tests, distPath },
  ) {
    this.name = 'InlineChunkHtmlPlugin';
    this.tests = tests;
    this.distPath = distPath;
    this.inlinedAssets = new Set();
    this.htmlPlugin = htmlPlugin;
  }

  /**
   * If we inlined the chunk to HTML,we should update the value of sourceMappingURL,
   * because the relative path of source code has been changed.
   * @param source
   */
  updateSourceMappingURL({
    source,
    compilation,
    publicPath,
    type,
  }) {
    const { devtool } = compilation.options;

    if (
      devtool &&
      // If the source map is inlined, we do not need to update the sourceMappingURL
      !devtool.includes('inline') &&
      source.includes('# sourceMappingURL')
    ) {
      const prefix = addTrailingSlash(
        join(publicPath, this.distPath[type] || ''),
      );

      return source.replace(
        /# sourceMappingURL=/,
        `# sourceMappingURL=${prefix}`,
      );
    }

    return source;
  }

  getInlinedScriptTag(
    publicPath,
    tag,
    compilation,
  ) {
    const { assets } = compilation;

    if (!(tag?.attributes.src && isString(tag.attributes.src))) {
      return tag;
    }
    const scriptName = publicPath
      ? tag.attributes.src.replace(publicPath, '')
      : tag.attributes.src;

    if (!this.tests.some(test => test.exec(scriptName))) {
      return tag;
    }
    const asset = assets[scriptName];
    if (asset == null) {
      return tag;
    }

    const source = asset.source().toString();

    const ret = {
      tagName: 'script',
      innerHTML: this.updateSourceMappingURL({
        source,
        compilation,
        publicPath,
        type: 'js',
      }),
      closeTag: true,
    };

    // mark asset has already been inlined
    this.inlinedAssets.add(scriptName);

    return ret;
  }

  getInlinedCSSTag(
    publicPath,
    tag,
    compilation,
  ) {
    const { assets } = compilation;

    if (!(tag.attributes.href && isString(tag.attributes.href))) {
      return tag;
    }

    const linkName = publicPath
      ? tag.attributes.href.replace(publicPath, '')
      : tag.attributes.href;

    if (!this.tests.some(test => test.exec(linkName))) {
      return tag;
    }

    const asset = assets[linkName];

    const source = asset.source().toString();
    const ret = {
      tagName: 'style',
      innerHTML: this.updateSourceMappingURL({
        source,
        compilation,
        publicPath,
        type: 'css',
      }),
      closeTag: true,
    };

    // mark asset has already been inlined
    this.inlinedAssets.add(linkName);

    return ret;
  }

  getInlinedTag(
    publicPath,
    tag,
    compilation,
  ) {
    if (tag.tagName === 'script') {
      return this.getInlinedScriptTag(
        publicPath,
        tag,
        compilation,
      );
    }

    return tag;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(this.name, (compilation) => {
      const publicPath =
        typeof compiler.options.output.publicPath === 'string'
          ? addTrailingSlash(compiler.options.output.publicPath)
          : '/';

      const tagFunction = (tag) =>
        this.getInlinedTag(publicPath, tag, compilation);

      const hooks = this.htmlPlugin.getHooks(compilation);

      hooks.alterAssetTagGroups.tap(this.name, assets => {
        assets.headTags = assets.headTags.map(tagFunction);
        assets.bodyTags = assets.bodyTags.map(tagFunction);
        return assets;
      });

      compilation.hooks.processAssets.tap(
        {
          name: 'InlineChunkHtmlPlugin',
          /**
           * Remove marked inline assets in summarize stage,
           * which should be later than the emitting of html-webpack-plugin
           */
          // PROCESS_ASSETS_STAGE_SUMMARIZE
          stage: 1000,
        },
        () => {
          this.inlinedAssets.forEach(name => {
            // use delete instead of compilation.deleteAsset
            // because we want to preserve the related files such as source map
            delete compilation.assets[name];
          });
          this.inlinedAssets.clear();
        },
      );
    });
  }
}

module.exports =  {
  InlineChunkHtmlPlugin,
}