import { NextFunction, Request, Response } from 'express';
import { CateogryModel, ICategory } from '../models';
import { IRequest } from '../interfaces/server.interface';
import {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
} from '../utils/serverCodes';

export const getCategories = async (
  req: Request<{}, {}, {}, { limit?: string; page?: string }>,
  res: Response,
  next: NextFunction
) => {
  const page = +req.query.page! || 1;
  const limit = +req.query.limit! || 5;
  const skip = (page - 1) * limit;

  const query = { active: true } as { active: boolean };

  try {
    const [totalCategories, categories] = await Promise.all([
      CateogryModel.countDocuments(query),
      CateogryModel.find(query)
        .populate('user', 'name')
        .skip(skip)
        .limit(limit),
    ]);

    res.status(HTTP_STATUS_OK).json({
      categories,
      currentPage: page,
      totalPages: Math.ceil(totalCategories / limit),
      totalCategories,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const getCategory = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const category = await CateogryModel.findById(id).populate('user', 'name');
    res.status(HTTP_STATUS_OK).json(category);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const saveCategory = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body as ICategory;
  const user = req.user;
  const categoryName = name.toUpperCase();
  try {
    const cateogryExist = await CateogryModel.findOne({ name: categoryName });

    if (cateogryExist) {
      return res.status(HTTP_STATUS_BAD_REQUEST).json({
        msg: `The category ${name} already exist`,
      });
    }

    const saveCategory = new CateogryModel({
      name: categoryName,
      user: user?._id,
    });
    await saveCategory.save();

    res.status(HTTP_STATUS_CREATED).json(saveCategory);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const updateCategory = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params as { id: string };

  const { active, user, ...category } = req.body as ICategory;
  const updateCategory = {
    user: req.user?._id,
    name: category.name.toUpperCase(),
  };
  try {
    const updatedCategory = await CateogryModel.findByIdAndUpdate(
      id,
      updateCategory,
      { new: true }
    );
    res.status(HTTP_STATUS_OK).json(updatedCategory);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const deleteCategory = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params as { id: string };
  try {
    const deleteCategory = await CateogryModel.findByIdAndUpdate(id, {
      active: false,
    });
    res.status(HTTP_STATUS_OK).json(deleteCategory);
  } catch (e) {
    console.error(e);
    next(e);
  }
};
