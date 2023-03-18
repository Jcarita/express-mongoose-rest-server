import { Schema, model, Document, ObjectId } from 'mongoose';
import { IUser } from './user.model';
import { ICategory } from './category.model';

export interface IProduct extends Document {
  _id?: ObjectId;
  uid?: ObjectId;
  name: string;
  description: string;
  precio: number;
  active: boolean;
  available: boolean;
  user?: IUser;
  category?: ICategory;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'The name is required'],
    unique: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  description: { type: String },
  active: {
    type: Boolean,
    default: true,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

ProductSchema.methods.toJSON = function () {
  const { __v, _id, ...product } = this.toObject();
  return { uid: _id, ...product };
};

export const ProductModel = model<IProduct>('Product', ProductSchema);
