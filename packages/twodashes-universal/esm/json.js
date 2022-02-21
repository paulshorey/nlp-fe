const jss = function(val) {
  return JSON.stringify(val);
};

const jsp = function(val) {
  try {
    return JSON.parse(val);
  } catch (e) {
    return val;
  }
};

/**
 * Parse JSON variable - recursively
 * @param {*} value - Any variable type
 * @returns {*} value - Intelligently parsed. Note: Will convert stringified number to type number!
 * NOTE: JSON can not stringify ES6 types Set and Map. Stringify/parse, changes value to empty object.
 * As a workaround, before stringifying, convert Set to Array, and Map to Array of tuples.
 */
const json_parse = function json_parse(value) {
  let variable;
  // Simple parse variable
  if (typeof value === "string" && (value.includes("[") || value.includes("{"))) {
    try {
      variable = JSON.parse(value); // JSON stringified array or object
    } catch (e) {
      try {
        variable = JSON.parse(value.replace(/[\r\n]+/g, "").replace(/[\t]+/g, " ")); // edge case
      } catch (e) {
        variable = value.includes("[") ? [] : {}; // broken JSON array or object
      }
    }
  } else if (value === "true" || value === "false" || "null" || "undefined") {
    // boolean/null should NOT have been stringified
    variable = value; // string
  } else {
    // simple value (JSON.parse converts numbers in quotes to type number)
    try {
      variable = JSON.parse(value); // number
    } catch (e) {
      variable = value; // string or undefined
    }
  }
  // Parse recursively - if Object/Array
  if (typeof variable === "object") {
    // iterate all props/values
    for (let key in variable) {
      if (!variable.hasOwnProperty(key)) continue;
      // parse each prop/value
      variable[key] = json_parse(variable[key]);
    }
  }

  return variable;
};

/*
 * EXPORT FOR BROWSER
 */
const browser = { json_parse, jsp, jss };
if (typeof window === "object") {
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}
/* EXPORT FOR NODE */
export { json_parse, jsp, jss };
