import { UserModel, RoleModel, CateogryModel, ProductModel } from '../models';
export const isRoleValid = async (role: string) => {
  const roleExist = await RoleModel.findOne({ role });
  if (!roleExist) {
    throw new Error(`the role: ${role} is not registered`);
  }
};

export const isEmailExist = async (email: string) => {
  const emailExist = await UserModel.findOne({ email });
  if (emailExist) {
    throw new Error(`the email "${email}" already registered`);
  }
};

export const userByIdExist = async (id: string) => {
  const userExist = await UserModel.findById(id);
  if (!userExist) {
    throw new Error(`the user with id: ${id}, not exist`);
  }
};

export const categoryExist = async (id: string) => {
  const categoryExist = await CateogryModel.findById(id);
  if (!categoryExist) {
    throw new Error(`The category with id: ${id} not exist`);
  }
};

export const productExist = async (id: string) => {
  const productExist = await ProductModel.findById(id);
  if (!productExist) {
    throw new Error(`The product with id: ${id} not exist`);
  }
};
