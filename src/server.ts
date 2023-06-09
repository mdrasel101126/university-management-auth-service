import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorLogger, logger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});
let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database connected successfully');
    server = app.listen(config.port, () => {
      logger.info(`application listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error('Failed to connect database', err);
  }
  process.on('unhandledRejection', error => {
    errorLogger.error(
      'Unhandled Rejection is detected,we are closing our server'
    );
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

//console.log(x)

process.on('SIGTERM', () => {
  logger.info('SIGTEAM is received');
  if (server) {
    server.close();
  }
});
