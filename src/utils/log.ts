const winston = require("winston");
const moment = require("moment");
require("winston-daily-rotate-file");

// set default log level.
const logLevel = "debug";

// Set up logger
const customColors = {
  trace: "white",
  debug: "green",
  info: "blue",
  warn: "yellow",
  crit: "red",
  fatal: "red",
};

// create formatter for dates used as timestamps
const tsFormat = () => moment().format("YYYY-MM-DD HH:mm:ss.SSS").trim();

const logger = new winston.Logger({
  colors: customColors,
  level: logLevel,
  levels: {
    fatal: 0,
    crit: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  },
  transports: [
    new winston.transports.Console({
      colorize: true,
      timestamp: tsFormat,
    }),
  ],
});

winston.addColors(customColors);

// Extend logger object to properly log 'Error' types
const origLog = logger.log;
// @ts-ignore
logger.log = function (level, msg) {
  if (msg instanceof Error) {
    const args = Array.prototype.slice.call(arguments);
    args[1] = msg.stack;
    origLog.apply(logger, args);
  } else {
    origLog.apply(logger, arguments);
  }
};
/* LOGGER EXAMPLES
  var log = require('./log.js')
  log.trace('testing')
  log.debug('testing')
  log.info('testing')
  log.warn('testing')
  log.crit('testing')
  log.fatal('testing')
 */

export default logger;
