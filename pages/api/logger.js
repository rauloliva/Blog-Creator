const winston = require("winston");
const { createLogger, format } = winston;
const { combine, timestamp, label, printf } = format;

export const loggerConstructor = (labelText) => {
  const myFormat = printf(({ level, message, timestamp }) => {
    const date = new Date(timestamp);
    return `${date.toLocaleString()} [${labelText}] ${level}: ${message}`;
  });

  const logger = createLogger({
    level: "info",
    format: format.json(),
    format: combine(label({ label: "API" }), timestamp(), myFormat),
    transports: [
      new winston.transports.File({
        filename: "logs/errors.log",
        level: "error",
      }),
      new winston.transports.File({ filename: "logs/logs.log" }),
      new winston.transports.Console({ format: winston.format.simple() }),
    ],
  });

  return logger;
};
