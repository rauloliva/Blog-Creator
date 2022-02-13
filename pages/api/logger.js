const winston = require('winston');
const fs = require('fs');
const { createLogger, format } = winston;
const { combine, timestamp, label, printf } = format;

class ConsoleLogger {
  info(msg) {
    console.log('Info: ', msg);
  }

  error(msg) {
    console.error('Error: ', msg);
  }
}

export const loggerConstructor = labelText => {
  if (process.env.NODE_ENV == 'production') {
    const consoleLogger = new ConsoleLogger();
    return consoleLogger;
  }

  fs.existsSync('logs') || fs.mkdirSync('logs');

  const myFormat = printf(({ level, message, timestamp }) => {
    const date = new Date(timestamp);
    return `${date.toLocaleString()} [${labelText}] ${level}: ${message}`;
  });

  const logger = createLogger({
    level: 'info',
    format: format.json(),
    format: combine(label({ label: 'API' }), timestamp(), myFormat),
    transports: [
      new winston.transports.File({
        filename: 'logs/errors.log',
        level: 'error',
      }),
      new winston.transports.File({ filename: 'logs/logs.log' }),
      new winston.transports.Console({ format: winston.format.simple() }),
    ],
  });

  return logger;
};
