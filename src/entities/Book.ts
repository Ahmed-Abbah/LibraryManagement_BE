import { Borrow } from "./Borrows";

export interface Book {
    id: number;
    title: string;
    author: string;
    publicationDate: Date;
    isAvailable: boolean;
    borrows?: Borrow[]; // Assuming you don't need to define the structure of borrows
  }
  