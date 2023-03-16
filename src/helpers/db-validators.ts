import { UserModel } from '../models/user.model';
import { RoleModel } from '../models/role.model';

export const isRoleValid = async (role: string) => {
  const roleExist = await RoleModel.findOne({ role });
  if (!roleExist) {
    throw new Error(`El role ${role} no esta resgitrado`);
  }
};

export const isEmailExist = async (email: string) => {
  const emailExist = await UserModel.findOne({ email });
  if (emailExist) {
    throw new Error(`El email "${email}" ya esta registrado `);
  }
};

export const userByIdExist = async (id: string) => {
  const userExist = await UserModel.findById(id);
  if (!userExist) {
    throw new Error(`El usuario con id ${id}, no existe`);
  }
};
