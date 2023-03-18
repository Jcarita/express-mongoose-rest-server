import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileArray, UploadedFile } from 'express-fileupload';

export const uploadFiles = (
  folder: string,
  files: FileArray,
  extensionsAllowed: string[]
) => {
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
