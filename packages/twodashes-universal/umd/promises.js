parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"rfek":[function(require,module,exports) {
"use strict";function e(o){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(o)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.arr_each_promise_all=t,exports.sleep=void 0;var o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return new Promise(function(o){return setTimeout(o,e)})};function t(e,o){return Promise.all(e.map(function(e){return o(e)}))}if(exports.sleep=o,"object"===("undefined"==typeof window?"undefined":e(window))){var n={arr_each_promise_all:t,sleep:o};for(var r in window.__=window.__||{},n)window.__[r]=n[r]}
},{}]},{},["rfek"], null)
//# sourceMappingURL=promises.js.map