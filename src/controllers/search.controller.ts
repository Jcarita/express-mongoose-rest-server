import { NextFunction, Response } from 'express';
import { IRequest } from '../interfaces/server.interface';
import {
  HTTP_STATUS_OK,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_SERVER_ERROR,
} from '../utils/serverCodes';
import { Types } from 'mongoose';
import { UserModel } from '../models/user.model';
import { CateogryModel } from '../models/category.model';
import { ProductModel } from '../models/product.model';

const collectionAllowed = ['user', 'category', 'product', 'role'];

const searchUser = async (term: string, res: Response) => {
  const isMongoID = Types.ObjectId.isValid(term);

  if (isMongoID) {
    const user = await UserModel.findById(term);
    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(term, 'i');

  const users = await UserModel.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ active: true }],
  });

  return res.status(HTTP_STATUS_OK).json({ results: users });
};

const searchCategories = async (term: string, res: Response) => {
  const isMongoId = Types.ObjectId.isValid(term);

  if (isMongoId) {
    const category = await CateogryModel.findById(term);
    return res.json({
      results: category ? [category] : [],
    });
  }

  const regex = new RegExp(term, 'i');

  const categories = await CateogryModel.find({ name: regex, active: true });

  return res.status(HTTP_STATUS_OK).json({
    results: categories,
  });
};

const searchProducts = async (term: string, res: Response) => {
  const isMongoId = Types.ObjectId.isValid(term);

  if (isMongoId) {
    const product = await ProductModel.findById(term);
    return res.json({
      results: product ? [product] : [],
    });
  }

  const regex = new RegExp(term, 'i');

  const products = await ProductModel.find({
    name: regex,
    active: true,
  });

  return res.status(HTTP_STATUS_OK).json({
    results: products,
  });
};

export const search = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { collection, term } = req.params as {
    collection: string;
    term: string;
  };

  if (!collectionAllowed.includes(collection)) {
    return res.status(HTTP_STATUS_BAD_REQUEST).json({
      msg: `the collection ${collection} not allowed`,
    });
  }
  try {
    switch (collection) {
      case 'user':
        await searchUser(term, res);
        break;
      case 'category':
        await searchCategories(term, res);
        break;
      case 'product':
        await searchProducts(term, res);
        break;
      default:
        return res.status(HTTP_STATUS_SERVER_ERROR).json({
          msg: 'that search was not implemented',
        });
        break;
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
