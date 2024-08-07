import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;

    const logMessage = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      responseTime: `${duration}ms`,
      clientIp: req.ip,
      userAgent: req.headers['user-agent'],
      referer: req.headers['referer'] || 'N/A',
    };

    Logger.log(JSON.stringify(logMessage, null, 2), 'RequestLogger');

    // Add a blank line after the log message
    console.log();
  });

  next();
}
