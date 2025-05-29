import fs from 'fs/promises';
import path from 'path';

const errorLogFile = path.resolve('errors.log');

export const errorHandler = async (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  const logMessage = JSON.stringify({
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    status: statusCode,
    message
  }, null, 2) + '\n';

  try {
    await fs.appendFile(errorLogFile, logMessage);
  } catch (error) {
    console.error('Failed to log error:', error);
  }

  res.status(statusCode).json({
    success: false,
    error: message
  });
};