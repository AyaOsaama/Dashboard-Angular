import { ICategory } from "./icategory";

export interface Iimagecategory extends ICategory {
  imageFile?: File |null;
  imagePreview?: string;
}
