import { Component } from '@angular/core';
import { Book } from 'src/entities/Book';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';


import { BorrowsService } from 'src/app/services/borrows.service';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent {
  books: Book[] = [];

  constructor(private booksService: BooksService, private router:Router,
    private authService:AuthenticationService,
  private borrowService : BorrowsService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.booksService.getAllBooks().subscribe(
      {
        next : (books: Book[]) => {
          this.books = books;
        },
        error : (error) => {
          console.error('Error fetching books', error);
        }
      }
    );
  }

  borrowBook(bookId: number): void {
    // Implement borrow book functionality, e.g., redirect to borrow page with book ID
    const userId : string | null = this.authService.loadLoggedUserId();
    this.borrowService.borrowBook(userId,bookId).subscribe({
      next: (data: any) : void => {
        this.router.navigateByUrl("/list-book");
      },
      error: (err: any) : void => {
        console.error(err);
      }
    });
    console.log("clicked borrow bookid  : "+ bookId + " with user id : "+userId);
    this.router.navigate(['/list-book']);
  }

  modifyBook(id: number): void {
    // Implement modify book functionality, e.g., redirect to modify page with book ID
    this.router.navigate(['/modify-book', id]);
  }

  formatDate(date:any):String{
    const publicationDate = new Date(date); // Convert ISO string to Date object
  
      if (!isNaN(publicationDate.getTime())) { // Check if the conversion was successful
        const year = publicationDate.getFullYear().toString();
        const month = (publicationDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
        const day = publicationDate.getDate().toString().padStart(2, '0');
  
        return `${year}-${month}-${day}`;
        
      } else {
        console.error('Invalid publication date format:', date);
        return "Invalid date format"; 
      }
  }

  getStatus(status:boolean){
    if(status){
      return "Available";
    }else{
      return "Not Available";
    }
  }

  
}
