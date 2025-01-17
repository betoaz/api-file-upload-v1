import { createLogger, transports, format } from 'winston'

const { combine } = format
const dirname = './logs'
const customFormat = combine(
  format.label({ label: 'API File Upload' }),
  format.timestamp(),
)
const logFormat = combine(
  customFormat,
  format.json(),
)
const console = new transports.Console({
  format: combine(
    customFormat,
    format.colorize(),
    format.printf(({ timestamp, level, label, message }) => `[${timestamp}] ${level}: ${label} — ${message}`),
  ),
})
const logger = createLogger({
  transports: [
    console,
    new transports.File({
      dirname,
      filename: 'combined.log',
      format: logFormat,
    }),
    new transports.File({
      dirname,
      filename: 'error.log',
      format: logFormat,
      level: 'error',
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      dirname,
      filename: 'exceptions.log',
      format: logFormat,
    }),
  ],
  rejectionHandlers: [
    new transports.File({
      dirname,
      filename: 'rejections.log',
      format: logFormat,
    }),
  ],
})

export default logger
