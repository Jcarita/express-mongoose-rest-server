import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { FileArray, UploadedFile } from 'express-fileupload';
import { IRequest } from '../interfaces/server.interface';

export const uploadFiles = (
  folder: string,
  files: FileArray | null | undefined,
  extensionsAllowed: string[]
): Promise<string> => {
  return new Promise((resolve, rejected) => {
    const { file } = files as { file: UploadedFile };
    const extension = path.extname(file.name);

    if (!extensionsAllowed.includes(extension)) {
      return rejected(`the extensions allowed are ${extensionsAllowed}`);
    }
    const tempName = `${uuidv4()}_${file.name}`;
    const uploadsPath = path.join(__dirname, '../uploads', folder, tempName);

    file.mv(uploadsPath, (err) => {
      if (err) {
        return rejected(err);
      }

      resolve(tempName);
    });
  });
};

export const uploadAndCheckFile = async (
  collection: string,
  req: IRequest,
  img: string,
  extensionsAllowed: string[]
): Promise<string> => {
  if (img) {
    const pathImg = path.join(__dirname, '../uploads', collection, img);
    if (fs.existsSync(pathImg)) {
      fs.unlinkSync(pathImg);
    }
  }

  return (await uploadFiles(
    collection,
    req.files,
    extensionsAllowed
  )) as string;
};
