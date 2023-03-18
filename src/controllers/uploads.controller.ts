import { Response } from 'express';
import { IRequest } from '../interfaces/server.interface';
import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_OK } from '../utils/serverCodes';
import { uploadFiles } from '../helpers/upload-file';
const extensionsAllowed = ['.jpg', '.png', '.jpeg', '.gif'];

export const uploadFile = async (req: IRequest, res: Response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(HTTP_STATUS_BAD_REQUEST).json({ msg: 'no files' });
  }

  try {
    const filename = await uploadFiles('demo', req.files, extensionsAllowed);

    return res.status(HTTP_STATUS_OK).json({
      msg: filename,
    });
  } catch (e) {
    console.error(e);
    res.status(HTTP_STATUS_BAD_REQUEST).json({
      msg: e,
    });
  }
};
