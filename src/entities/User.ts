import { Borrow } from "./Borrows";

export interface User {
    id: number;
    name: string;
    email: string;
    borrows?: Borrow[]; // Assuming you don't need to define the structure of borrows
  }