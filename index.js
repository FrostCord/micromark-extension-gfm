/**
 * @typedef {import('micromark-util-types').Extension} Extension
 * @typedef {import('micromark-util-types').HtmlExtension} HtmlExtension
 * @typedef {import('micromark-extension-gfm-strikethrough').Options} Options
 */

import {
  combineExtensions,
  combineHtmlExtensions
} from 'micromark-util-combine-extensions'
import {
  gfmAutolinkLiteral,
  gfmAutolinkLiteralHtml
} from 'micromark-extension-gfm-autolink-literal'
import {
  gfmStrikethrough,
  gfmStrikethroughHtml
} from 'micromark-extension-gfm-strikethrough'
import {gfmTable, gfmTableHtml} from 'micromark-extension-gfm-table'
import {gfmTagfilterHtml} from 'micromark-extension-gfm-tagfilter'
import {
  gfmTaskListItem,
  gfmTaskListItemHtml
} from 'micromark-extension-gfm-task-list-item'

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
export function gfm(options) {
  return combineExtensions([
    gfmAutolinkLiteral,
    gfmStrikethrough(options),
    gfmTable,
    gfmTaskListItem
  ])
}

/**
 * Add support for turning GFM in markdown to HTML.
 *
 * Function that can be called to get an HTML extension for micromark (passed
 * in `htmlExtensions`).
 *
 * @returns {HtmlExtension}
 *   HTML extension for micromark (passed in `htmlExtensions`).
 */
export function gfmHtml() {
  return combineHtmlExtensions([
    gfmAutolinkLiteralHtml,
    gfmStrikethroughHtml,
    gfmTableHtml,
    gfmTagfilterHtml,
    gfmTaskListItemHtml
  ])
}
