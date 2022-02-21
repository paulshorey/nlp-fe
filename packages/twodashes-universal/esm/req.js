/**
 * Parse and combine POST data and URL params into JavaScript object
 * @param req {object} - IMPORTANT: does not have to be real api request. Can be simple object.
 * @param req.body {object} - key/value pairs, already parsed and ready to use (ex: {options:{}})
 * @param req.query {object} - object of key/value pairs from URL query string (ex: ?str=wordio&tld=co)
 *    will override req.body. Values will be processed by decodeURIComponent
 * @param req.params {object} - object of key/value pairs from URL path  (ex: /v1/word/:key)
 *    will override req.query. Values will be processed by decodeURIComponent
 * @returns {{}} - combined keys/values. Original request object will NOT be modified.
 */
const aggregate_req_body_query = function (req) {
  /*
   * 1. prepare output
   */
  let output = {};
  // default value - to be overridden by more query/params:
  // req.body is least important
  if (req.body) {
    output = req.body;
  }
  /*
   * 2. aggregate inputs
   */
  // req.query is more important than req.body
  let inputs = {};
  if (req.query) {
    inputs = req.query;
  }
  // req.params is the most important
  if (req.params) {
    for (let key in req.params) {
      let val = req.params[key]
      if (val && val!==0) {
        inputs[key] = val
      }
    }
  }
  /*
   * 3. process inputs
   */
  if (inputs) {
    for (let key in inputs) {
      let val = inputs[key];
      if (val === 0) {
        output[key] = 0;
        continue;
      }
      if (!val) continue;
      val = decodeURIComponent(val).trim();
      if (!val) continue;
      if (val === "undefined") {
        output[key] = "undefined";
        continue;
      }
      if (val === "null") {
        output[key] = "null";
        continue;
      }
      if (val === "true") {
        output[key] = true;
        continue;
      }
      if (val === "false") {
        output[key] = false;
        continue;
      }
      if (['"', "{", "["].includes(val[0])) {
        try {
          val = JSON.parse(val);
        } catch (e) {
          val = "";
        }
      }
      output[key] = val;
    }
  }
  // combined
  return output;
};

/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = { aggregate_req_body_query };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}
/* EXPORT FOR NODE */
export { aggregate_req_body_query };
