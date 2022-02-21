import * as arr from "./arr.js";
import * as arrays from "./arrays.js";
import * as obj from "./obj.js";
import * as objects from "./objects.js";
import * as sort_words from "./sort_words.js";
import * as sort_strings from "./sort_strings.js";
import * as sort_objects from "./sort_objects.js";
import * as strings from "./strings.js";
import * as cli from "./cli.js";
import * as curry from "./curry.js";
import * as functions from "./etc.js";
import * as numbers from "./numbers.js";
import * as promises from "./promises.js";
import * as req from "./req.js";
import * as requests from "./requests.js";
import * as json from "./json.js";
import * as string from "./string.js";
import * as ui from "./ui.js";
import * as urls from "./urls.js";
import * as words from "./words.js";

let all = {
  arr,
  arrays,
  obj,
  objects,
  sort_objects,
  sort_strings,
  sort_words,
  cli,
  curry,
  functions,
  numbers,
  promises,
  req,
  requests,
  json,
  string,
  strings,
  ui,
  urls,
  words
};

/**
 * Export as a flat list
 */
let __ = { _map: {} };
for (let type in all) {
  __._map[type] = [];
  for (let func in all[type]) {
    __[func] = all[type][func];
    __._map[type].push(func);
  }
}

/**
 * Export for browser window
 */
if (typeof window === "object") {
  window.__ = __;
}

export default __;
