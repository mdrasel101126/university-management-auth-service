import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, label, printf } = format;
import path from 'path';

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'PHU' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },

  transports: [
    new transports.Console(),
    // eslint-disable-next-line no-undef
    new DailyRotateFile({
      // eslint-disable-next-line no-undef
      filename: path.join(
        // eslint-disable-next-line no-undef
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'phu-%DATE%-success.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});
const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'PHU' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    // eslint-disable-next-line no-undef
    new DailyRotateFile({
      // eslint-disable-next-line no-undef
      filename: path.join(
        // eslint-disable-next-line no-undef
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'phu-%DATE%-error.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export { logger, errorLogger };
