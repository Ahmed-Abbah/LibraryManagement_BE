import { Book } from "./Book";
import { User } from "./User";

export interface Borrow {

    id: number;
  
    user: User;
  
    book: Book;
  
    borrowDate: Date;

    returnDate: Date;
  }
  