/*
 * This is for use in Browser - however it will also work in Node (ESM) including Webpack
 */
const cconsoleInit = require("./index.js")

if (typeof window === 'object') {
  window.cconsoleInit = cconsoleInit
}

module.exports = cconsoleInit
