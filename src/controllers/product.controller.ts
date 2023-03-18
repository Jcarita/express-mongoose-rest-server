import { NextFunction, Response } from 'express';
import { IRequest } from '../interfaces/server.interface';
import { ProductModel, IProduct } from '../models/product.model';
import {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
} from '../utils/serverCodes';

export const getAllProducts = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const page = +req.query.page! || 1;
  const limit = +req.query.limit! || 5;
  const skip = (page - 1) * limit;

  const query = { active: true } as { active: boolean };

  try {
    const [totalProducts, products] = await Promise.all([
      ProductModel.countDocuments(),
      ProductModel.find(query).skip(skip).limit(limit),
    ]);
    res.status(HTTP_STATUS_OK).json({
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const getProductById = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params as { id: string };
  try {
    const product = await ProductModel.findById(id);
    res.status(HTTP_STATUS_OK).json(product);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const saveProduct = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { active, user, category, ...product } = req.body as IProduct;
  const userAthenticated = req.user?._id;
  // const categorytes = category
  console.log({ userAthenticated, category, user });
  try {
    const productDb = await ProductModel.findOne({ name: product.name });

    if (productDb) {
      return res.status(HTTP_STATUS_BAD_REQUEST).json({
        msg: `product ${product.name} already exist`,
      });
    }

    const savedProduct = new ProductModel({
      ...product,
      category,
      user: userAthenticated,
    });
    await savedProduct.save();

    res.status(HTTP_STATUS_CREATED).json(savedProduct);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const updateProduct = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params as { id: string };
  const { user, active, uid, ...product } = req.body as IProduct;
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, product, {
      new: true,
    });

    res.status(HTTP_STATUS_OK).json(updatedProduct);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const deleteProduct = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  // const user = req.user?._id
  // console.log(user);
  const { id } = req.params as { id: string };
  try {
    const deletedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { active: false },
      { new: true }
    );
    res.status(HTTP_STATUS_OK).json(deletedProduct);
  } catch (e) {
    console.error(e);
    next(e);
  }
};
