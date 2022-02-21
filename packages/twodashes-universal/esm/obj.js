/**
 * Makes it safe to use properties of unknown objects. Checks if object exists before getting property.
 *    For example, calling `base1.obj3.property2`,
 *    if base1 or obj3 is not an object, or is not defined, this will crash.
 *    Wrap it to be safe `_re(base1, 'obj3', 'property2')`.
 * @param {object} obj - object that you are unsure about - if it is null/undefined, that's ok
 * @param {string} prop_child - name of property of obj
 * @param {string} prop_grandchild - name of property of prop_child
 * @param {string} prop_grandgrandchild - name of property of prop_grandchild
 * @returns {*} - value of prop_grandchild, or prop_child whichever is more specific - or undefined
 */
function obj_prop(obj, prop_child, prop_grandchild, prop_grandgrandchild) {
  if (typeof obj === "object") {
    if (prop_grandgrandchild) {
      if (typeof obj[prop_child] === "object") {
        if (typeof obj[prop_child][prop_grandchild] === "object") {
          return obj[prop_child][prop_grandchild][prop_grandgrandchild];
        }
      }
    } else if (prop_grandchild) {
      if (typeof obj[prop_child] === "object") {
        return obj[prop_child][prop_grandchild];
      }
    } else {
      return obj[prop_child];
    }
  }
}


/**
 * Return the first value in an object
 *    Iterate the object only once. Return the first value.
 * @param {object} obj
 * @returns value of first item in object
 */
const obj_first_value = function obj_first_value(obj) {
  for (let key in obj) { // doesn't loop, but that's the point!
    return obj[key]
  }
};


/**
 * Return the first entry (key and value tuple) in an object
 *    Iterate the object only once. Return the first entry.
 * @param {object} obj
 * @returns value of first item in object
 */
const obj_first_entry = function obj_first_value(obj) {
  for (let key in obj) { // doesn't loop, but that's the point!
    return [key, obj[key]]
  }
};

/**
 * @param {object} obj
 * @returns {boolean} - true if empty
 */
const obj_is_empty = function obj_is_empty(obj) {
  for (let prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false
    }
  }
  return true
};


/*
 * EXPORT FOR BROWSER
 */
if (typeof window === "object") {
  const browser = { obj_prop, obj_first_value, obj_first_entry, obj_is_empty };
  // set up for export
  window.__ = window.__ || {};
  // flatten
  for (let func in browser) {
    window.__[func] = browser[func];
  }
}
/* EXPORT FOR NODE */
export { obj_prop, obj_first_value, obj_first_entry, obj_is_empty };
