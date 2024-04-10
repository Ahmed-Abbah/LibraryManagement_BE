import { Component } from '@angular/core';
import { Book } from 'src/entities/Book';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent {
  books: Book[] = [];

  constructor(private booksService: BooksService, private router:Router) { }

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

  borrowBook(id: number): void {
    // Implement borrow book functionality, e.g., redirect to borrow page with book ID
    this.router.navigate(['/borrow', id]);
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
