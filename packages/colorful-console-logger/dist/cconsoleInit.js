import * as $i1YTk$process from "process";

var $3a345d962a854970$exports = {};
var $1748495a4df4c085$exports = {};
var $4d234f7e2823d6bd$exports = {};

var $0e3f07a3c68c9c56$exports = {};
const $0e3f07a3c68c9c56$var$destroyCircular = (from, seen)=>{
    // null seen as object
    if (from === null || from === undefined) return from;
    // setup output variable
    const to = Array.isArray(from) ? [] : {
    };
    // reading
    seen.push(from);
    // iterate input
    for (const [key, value] of Object.entries(from)){
        if (typeof value === 'function') continue;
        if (!value || typeof value !== 'object') {
            to[key] = value;
            continue;
        }
        if (!seen.includes(from[key])) {
            to[key] = $0e3f07a3c68c9c56$var$destroyCircular(from[key], seen.slice());
            continue;
        }
        to[key] = '[Circular]';
    }
    const commonProperties = [
        'name',
        'message',
        'stack',
        'code'
    ];
    for (const property of commonProperties)if (typeof from[property] === 'string') to[property] = from[property];
    return to;
};
$0e3f07a3c68c9c56$exports = $0e3f07a3c68c9c56$var$destroyCircular;


var $eece51c51347c526$exports = {};

$eece51c51347c526$exports = (value)=>{
    if (typeof value === 'object') return $0e3f07a3c68c9c56$exports(value, []);
    // People sometimes throw things besides Error objects…
    if (typeof value === 'function') // `JSON.stringify()` discards functions. We do too, unless a function is thrown directly.
    return `[Function: ${value.name || 'anonymous'}]`;
    return value;
};


// use "browser" colors if in browser
let $4d234f7e2823d6bd$var$NODEJSCOLORS = typeof window !== "object" && typeof $i1YTk$process === "object";
// also use "browser" colors if in NodeJS with "--inspect" or "--inspect-brk" flag
// if (NODEJSCOLORS && process.execArgv.join().includes("--inspect")) {
//   NODEJSCOLORS = false
// }
/*
 * Log to console
 */ $4d234f7e2823d6bd$exports = function() {
    let args = [
        ...arguments
    ];
    // optionally, pass log-To-Cloud versions of each log action (log,info,error,etc.)
    if (!this.options) this.options = {
    };
    let { logToCloud: logToCloud = {
    } , useTrace: useTrace = false , useColor: useColor = true , separateTypes: separateTypes = false  } = this.options;
    /*
   * option:
   * trace file:line, where log originated
   */ let trace = "";
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
   */ // let hasError = false
    let a = 0;
    while(a < args.length){
        // if first argument is string, give it a colon ": "
        if (a === 0 && typeof args[a] === "string") {
            if (args.length > a + 1) args[a] += ": ";
            else args[a] += " ";
        }
        // fix object from being printed as "[object Object]"
        if (typeof args[a] === "object") {
            if (args[a] instanceof Error) // error object
            // hasError = true
            try {
                // going to assume this is an Error
                args[a] = $eece51c51347c526$exports(args[a]);
                if (typeof args[a] === "object") args[a] = $eece51c51347c526$exports(args[a].stack);
            } catch (e) {
            // console.error(e)
            }
            else // regular object
            // serialize so it does not display changes made after log has printed
            args[a] = JSON.parse(JSON.stringify($0e3f07a3c68c9c56$exports(args[a], [])));
        }
        a++;
    }
    /*
   * error - prepare message for output as string
   */ let error_message = "";
    if (this.action === "error_message") {
        args[0] = error_message = args[0] && typeof args[0] === "string" ? args[0].split("\n").slice(0, 2).map((str)=>str.replace(/\/.+\//g, "")
        ).toString() : "error";
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
   */ let action = this.action;
    let color1 = "";
    let color2 = "";
    if (useColor && typeof args[0] === "string") {
        /*
     * use by NODEJS in terminal
     */ if ($4d234f7e2823d6bd$var$NODEJSCOLORS) switch(this.action){
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
        else /*
       * for use in BROWSER
       */ switch(action){
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
    /*
   * custom actions
   */ switch(action){
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
   */ if (separateTypes) {
        if (action + this.action !== this.sharedContext.last_action) console.log("");
    }
    /*
   * Add trace (file-name:line-number)
   */ // log color
    if (color1) {
        if (trace) // color1, trace
        args = [
            color1,
            ...args,
            trace,
            color2
        ];
        else // color1, no trace
        args = [
            color1,
            ...args,
            color2
        ];
    } else if (trace) // no color1, trace
    args = [
        ...args,
        trace
    ];
    /*
   * Log message to console
   * use specified action (log, info, debug, warn, etc)
   */ console[action](...args);
    /*
   * Log original content to cloud
   */ if (logToCloud[action]) logToCloud[action](...arguments, trace);
    /*
   * Add linebreak when different actions back to back
   * but no linebreak when same action
   */ this.sharedContext.last_action = action + this.action;
    /*
   * return
   */ if (error_message) return error_message;
};


/**
 * Log to console, and optionally to your custom cloud functions
 *    In console, will color code each message:
 *        info: green
 *        warn: orange
 *        error: red
 *    Other methods (log, debug, trace, table, are not colored,
 *    because the coloring breaks Chrome developer tools console message)
 *
 * @param options {object} - options and settings
 *    See github project for more documentation and examples.
 * @param options.logToCloud {object} - an object of {key:value{function},} pairs
 *    Ex: {log:function(){}, info:function(){}, etc}
 *    Tested, and works well with LogDNA. `options.logToCloud = logdna.createLogger()`
 *    See github project for more documentation and examples.
 */ const $1748495a4df4c085$var$cconsoleInit = function(options = {
}) {
    // so different actions (log/info/debug/etc) can communicate with eachother:
    let sharedContext = {
    };
    // log
    let cconsole = {
        // custom (colorful) loggers
        log: $4d234f7e2823d6bd$exports.bind({
            action: "log",
            options: options,
            sharedContext: sharedContext
        }),
        info: $4d234f7e2823d6bd$exports.bind({
            action: "info",
            options: options,
            sharedContext: sharedContext
        }),
        debug: $4d234f7e2823d6bd$exports.bind({
            action: "debug",
            options: options,
            sharedContext: sharedContext
        }),
        warn: $4d234f7e2823d6bd$exports.bind({
            action: "warn",
            options: options,
            sharedContext: sharedContext
        }),
        error_message: $4d234f7e2823d6bd$exports.bind({
            action: "error_message",
            options: options,
            sharedContext: sharedContext
        }),
        error: $4d234f7e2823d6bd$exports.bind({
            action: "error",
            options: options,
            sharedContext: sharedContext
        }),
        trace: $4d234f7e2823d6bd$exports.bind({
            action: "trace",
            options: options,
            sharedContext: sharedContext
        }),
        success: $4d234f7e2823d6bd$exports.bind({
            action: "success",
            options: options,
            sharedContext: sharedContext
        }),
        subtle: $4d234f7e2823d6bd$exports.bind({
            action: "subtle",
            options: options,
            sharedContext: sharedContext
        }),
        // pass-through system debugging loggers
        clear: console.clear,
        time: console.time,
        table: console.table,
        timeEnd: console.timeEnd,
        timeLog: console.timeLog,
        assert: console.assert,
        count: console.count,
        countReset: console.countReset,
        dir: console.dir,
        dirxml: console.dirxml,
        group: console.group,
        groupCollapsed: console.groupCollapsed,
        groupEnd: console.groupEnd
    };
    // extra pass-through (default) loggers (non-standard)
    if (console.profile) cconsole.profile = console.profile;
    if (console.profileEnd) cconsole.profileEnd = console.profileEnd;
    if (console.timeStamp) cconsole.timeStamp = console.timeStamp;
    // return console
    return cconsole;
};
/*
 * Export cconsole
 */ $1748495a4df4c085$exports = $1748495a4df4c085$var$cconsoleInit;


if (typeof window === 'object') window.cconsole = $1748495a4df4c085$exports();
$3a345d962a854970$exports = $1748495a4df4c085$exports();


export {$3a345d962a854970$exports as default};
//# sourceMappingURL=cconsoleInit.js.map
