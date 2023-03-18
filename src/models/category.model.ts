import { Schema, model, Document, ObjectId } from 'mongoose';
import { IUser } from './user.model';

export interface ICategory extends Document {
  uid?: ObjectId;
  name: string;
  active: boolean;
  user?: IUser;
}

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, 'The name is required'],
    unique: true,
  },
  active: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

CategorySchema.methods.toJSON = function () {
  const { __v, _id, ...category } = this.toObject();
  return { uid: _id, ...category };
};

export const CateogryModel = model<ICategory>('Category', CategorySchema);
