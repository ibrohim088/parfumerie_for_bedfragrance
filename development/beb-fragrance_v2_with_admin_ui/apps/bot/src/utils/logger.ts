type LogLevel = 'info' | 'warn' | 'error' | 'debug';

function getTimestamp(): string {
  return new Date().toISOString();
}

function log(level: LogLevel, message: string, meta?: unknown): void {
  const timestamp = getTimestamp();
  const prefix = `[${timestamp}] [BOT] [${level.toUpperCase()}]`;

  if (meta !== undefined) {
    console[level === 'debug' ? 'log' : level](`${prefix} ${message}`, meta);
  } else {
    console[level === 'debug' ? 'log' : level](`${prefix} ${message}`);
  }
}

export const logger = {
  info: (message: string, meta?: unknown) => log('info', message, meta),
  warn: (message: string, meta?: unknown) => log('warn', message, meta),
  error: (message: string, meta?: unknown) => log('error', message, meta),
  debug: (message: string, meta?: unknown) => {
    if (process.env.NODE_ENV !== 'production') {
      log('debug', message, meta);
    }
  },
};