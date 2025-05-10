import { Ipost } from "./ipost"; 
export interface Ieditpost extends Ipost {
  imageFile?: File |null;
  imagePreview?: string;
}