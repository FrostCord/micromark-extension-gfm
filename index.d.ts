/**
 * Add support for parsing GFM in markdown.
 *
 * Function that can be called to get a syntax extension for micromark (passed
 * in `extensions`).
 *
 * @param {Options} [options]
 *   Configuration (optional).
 *   Passed to `micromark-extens-gfm-strikethrough`.
 * @returns {Extension}
 *   Syntax extension for micromark (passed in `extensions`).
 */
export function gfm(options?: import("micromark-extension-gfm-strikethrough/lib/syntax").Options | undefined): Extension;
/**
 * Add support for turning GFM in markdown to HTML.
 *
 * Function that can be called to get an HTML extension for micromark (passed
 * in `htmlExtensions`).
 *
 * @returns {HtmlExtension}
 *   HTML extension for micromark (passed in `htmlExtensions`).
 */
export function gfmHtml(): HtmlExtension;
export type Extension = import('micromark-util-types').Extension;
export type HtmlExtension = import('micromark-util-types').HtmlExtension;
export type Options = import('micromark-extension-gfm-strikethrough').Options;
