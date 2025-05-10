import { IUser } from './iuser';
export interface IEditableUser extends IUser {
  imageFile?: File |null;
  imagePreview?: string;
}