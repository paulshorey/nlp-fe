const destroyCircular = require("./destroyCircular");
const serializeError = require("./serializeError");

// use "browser" colors if in browser
let NODEJSCOLORS = typeof window !== "object" && typeof process === "object";
// also use "browser" colors if in NodeJS with "--inspect" or "--inspect-brk" flag
// if (NODEJSCOLORS && process.execArgv.join().includes("--inspect")) {
//   NODEJSCOLORS = false
// }

/*
 * Log to console
 */
module.exports = function () {
  let args = [...arguments];
  // optionally, pass log-To-Cloud versions of each log action (log,info,error,etc.)
  if (!this.options) this.options = {};
  let { logToCloud = {}, useTrace = false, useColor = true, separateTypes = false } = this.options;

  /*
   * option:
   * trace file:line, where log originated
   */
  let trace = "";
  if (useTrace) {
    let stack = [];
    let err = new Error();
    if (err.stack) {
      stack = err.stack.split("\n");
      if (stack[2]) {
        // determine file:line which called this console log
        let str = stack[2];
        let i_end = str.lastIndexOf(":");
        let i_start_before = str.lastIndexOf("/", i_end - 20) + 1;
        trace = `(${str.substring(i_start_before, i_end)})`;
      }
    }
  }

  /*
   * optimize message view
   */
  // let hasError = false
  let a = 0;
  while (a < args.length) {
    // if first argument is string, give it a colon ": "
    if (a === 0 && typeof args[a] === "string") {
      if (args.length > a + 1) {
        args[a] += ": ";
      } else {
        args[a] += " ";
      }
    }
    // fix object from being printed as "[object Object]"
    if (typeof args[a] === "object") {
      if (args[a] instanceof Error) {
        // error object
        // hasError = true
        try {
          // going to assume this is an Error
          args[a] = serializeError(args[a]);
          if (typeof args[a] === "object") {
            args[a] = serializeError(args[a].stack);
          }
        } catch (e) {
          // console.error(e)
        }
      } else {
        // regular object
        // serialize so it does not display changes made after log has printed
        args[a] = JSON.parse(JSON.stringify(destroyCircular(args[a], [])));
      }
    }
    a++;
  }

  /*
   * error - prepare message for output as string
   */
  let error_message = "";
  if (this.action === "error_message") {
    args[0] = error_message =
      args[0] && typeof args[0] === "string"
        ? args[0]
            .split("\n")
            .slice(0, 2)
            .map((str) => str.replace(/\/.+\//g, ""))
            .toString()
        : "error";
    this.action = "error";
  }

  /*
   * color1 messages
   *
   * on NODE JS
   * https://en.wikipedia.org/wiki/ANSI_escape_code#Colors <- use "FG Code" for text, "BG Code" for background
   *
   * \x1b[41m     \x1b[33m       %s        \x1b[0m
   * red bg       yellow text    string    escape for next line
   *
   * \x1b[47m           \x1b[30m       %s        \x1b[0m
   * light grey bg      black text     string    escape for next line
   */
  let action = this.action;
  let color1 = "";
  let color2 = "";
  if (useColor && typeof args[0] === "string") {
    /*
     * use by NODEJS in terminal
     */
    if (NODEJSCOLORS) {
      switch (this.action) {
        case "error":
          color1 = "\x1b[41m\x1b[33m%s\x1b[0m";
          break;
        case "warn":
          color1 = "\x1b[43m\x1b[30m%s\x1b[0m";
          break;
        case "info":
          color1 = "\x1b[46m\x1b[30m%s\x1b[0m";
          break;
        case "debug":
          color1 = "\x1b[45m\x1b[30m%s\x1b[0m";
          break;
        case "trace":
          color1 = "\x1b[106m\x1b[30m%s\x1b[0m";
          break;
        case "success":
          color1 = "\x1b[42m\x1b[30m%s\x1b[0m";
          this.action = "log";
          break;
        case "subtle":
          color1 = "\x1b[40m\x1b[90m%s\x1b[0m";
          this.action = "log";
          break;
      }
    } else {
      /*
       * for use in BROWSER
       */
      switch (action) {
        case "error":
          args[0] = "%c" + args[0];
          args.splice(1, 0, "background:red; color:yellow");
          break;
        case "warn":
          args[0] = "%c" + args[0];
          args.splice(1, 0, "background:yellow; color:black");
          break;
        case "log":
          args[0] = "%c" + args[0];
          args.splice(1, 0, "background:cyan; color:black");
          break;
        case "info":
          args[0] = "%c" + args[0];
          args.splice(1, 0, "background:teal; color:black");
          break;
        case "debug":
          args[0] = "%c" + args[0];
          args.splice(1, 0, "background:magenta; color:black");
          break;
        case "trace":
          args[0] = "%c" + args[0];
          args.splice(1, 0, "background:cyan; color:black");
          break;
        case "success":
          args[0] = "%c" + args[0];
          args.splice(1, 0, "background:lawngreen; color:black");
          break;
        case "subtle":
          args[0] = "%c" + args[0];
          args.splice(1, 0, "color:grey");
          break;
      }
    }
  }

  /*
   * custom actions
   */
  switch (action) {
    case "success":
      action = "log";
      break;
    case "subtle":
      action = "log";
      break;
  }

  /*
   * Add space between different types (groups) of messages
   *    TODO: maybe upgrade this to use console.group in browser
   */
  if (separateTypes) {
    if (action + this.action !== this.sharedContext.last_action) {
      console.log("");
    }
  }

  /*
   * Add trace (file-name:line-number)
   */
  // log color
  if (color1) {
    if (trace) {
      // color1, trace
      args = [color1, ...args, trace, color2];
    } else {
      // color1, no trace
      args = [color1, ...args, color2];
    }
  } else if (trace) {
    // no color1, trace
    args = [...args, trace];
  }

  /*
   * Log message to console
   * use specified action (log, info, debug, warn, etc)
   */
  console[action](...args);

  /*
   * Log original content to cloud
   */
  if (logToCloud[action]) {
    logToCloud[action](...arguments, trace);
  }

  /*
   * Add linebreak when different actions back to back
   * but no linebreak when same action
   */
  this.sharedContext.last_action = action + this.action;

  /*
   * return
   */
  if (error_message) {
    return error_message;
  }
};
