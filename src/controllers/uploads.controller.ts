import { NextFunction, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { IRequest } from '../interfaces/server.interface';
import {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_OK,
  HTTP_STATUS_SERVER_ERROR,
} from '../utils/serverCodes';
import { uploadFiles, uploadAndCheckFile } from '../helpers/upload-file';
import { UserModel, IUser } from '../models/user.model';
import { ProductModel, IProduct } from '../models/product.model';
const extensionsAllowed = ['.jpg', '.png', '.jpeg', '.gif'];

export const uploadFile = async (req: IRequest, res: Response) => {
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

export const updateUploadFile = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { collection, id } = req.params as { collection: string; id: string };
  let model: IProduct | IUser | null;

  try {
    switch (collection) {
      case 'user':
        const user = await UserModel.findById(id);
        if (!user) {
          return res.status(HTTP_STATUS_BAD_REQUEST).json({
            msg: `there is no user with the id ${id}`,
          });
        }
        user.img = await uploadAndCheckFile(
          collection,
          req,
          user.img!,
          extensionsAllowed
        );

        model = await user.save();

        break;
      case 'product':
        const product = await ProductModel.findById(id);
        if (!product) {
          return res.status(HTTP_STATUS_BAD_REQUEST).json({
            msg: `there is no product with the id ${id}`,
          });
        }
        product.img = await uploadAndCheckFile(
          collection,
          req,
          product.img!,
          extensionsAllowed
        );
        model = await product.save();
        break;
      default:
        return res.status(HTTP_STATUS_SERVER_ERROR).json({
          msg: 'not implemented',
        });
    }

    res.status(HTTP_STATUS_OK).json(model);
  } catch (e) {
    console.error(e);
    next();
  }
};

export const showImage = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { collection, id } = req.params as { collection: string; id: string };

  let model: IProduct | IUser | null;
  try {
    switch (collection) {
      case 'user':
        model = await UserModel.findById(id);
        if (!model) {
          return res.status(HTTP_STATUS_BAD_REQUEST).json({
            msg: `there is no user with the id ${id}`,
          });
        }
        break;
      case 'product':
        model = await ProductModel.findById(id);
        if (!model) {
          return res.status(HTTP_STATUS_BAD_REQUEST).json({
            msg: `there is no product with the id ${id}`,
          });
        }
        break;
      default:
        return res.status(HTTP_STATUS_SERVER_ERROR).json({
          msg: 'not implemented',
        });
    }

    if (model?.img) {
      const pathImg = path.join(
        __dirname,
        '../uploads',
        collection,
        model?.img
      );
      if (fs.existsSync(pathImg)) {
        return res.sendFile(pathImg);
      }
    }
    const pathNotImage = path.join(__dirname, '../assets/noimage.jpg');
    res.status(HTTP_STATUS_OK).sendFile(pathNotImage);
  } catch (e) {
    console.error(e);
    next();
  }
};
