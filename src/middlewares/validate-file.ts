import { NextFunction, Response } from 'express';
import { IRequest } from '../interfaces/server.interface';
import { HTTP_STATUS_BAD_REQUEST } from '../utils/serverCodes';

export const validateFile = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(HTTP_STATUS_BAD_REQUEST).json({ msg: 'no files - file' });
  }

  next();
};
