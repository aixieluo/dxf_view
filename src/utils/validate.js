/**
 * Created by PanJiaChen on 16/11/18.
 */

import { isString } from 'element-ui/src/utils/types'

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validName(str) {
  return isString(str) && str.length > 0
}
