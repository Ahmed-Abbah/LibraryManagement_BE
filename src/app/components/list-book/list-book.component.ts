import { Component } from '@angular/core';
import { Book } from 'src/entities/Book';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatTableDataSource } from '@angular/material/table';


import { BorrowsService } from 'src/app/services/borrows.service';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent {
  books: Book[] = [];

  
  constructor(private booksService: BooksService, private router:Router,
    private authService:AuthenticationService,
    private borrowService : BorrowsService) {

   }

  ngOnInit(): void {
    this.loadBooks();
    $(document).ready( function () {
      $('#listBookDatable').DataTable();
    });
  }

  loadBooks(): void {
    this.booksService.getAllBooks().subscribe(
      {
        next : (books: Book[]) => {
          this.books = books;
          setTimeout(() => {
            $('#datatable').DataTable({
              pagingType: 'full_numbers',
              pageLength: 5,
              processing: true,
              lengthMenu: [5, 10, 25],
            });
          }, 1)
        },
        error : (error) => {
          console.error('Error fetching books', error);
        }
      }
    );
  }

  borrowBook(bookId: number): void {
    const userId : string | null = this.authService.loadLoggedUserId();
    this.borrowService.borrowBook(userId,bookId).subscribe({
      next: (data: any) : void => {
        Utils.showSweetAlert("success","Book borrowed successfully","success");
        window.location.reload();
      },
      error: (err: any) : void => {
        console.error(err);
      }
    });
    console.log("clicked borrow book id  : "+ bookId + " with user id : "+userId);
    this.router.navigate(['/list-book']);
  }

  modifyBook(id: number): void {
    this.router.navigate(['/modify-book', id]);
  }

  deleteBook(id: number): void {
    this.booksService.deleteBook(id).subscribe({
      next : (data) : void => {
        Utils.showSweetAlert("success","Book deleted successfully","success");
        window.location.reload();
      },
      error : (err : any ) : void => {
        console.error(err);
      }
    });
  }

  formatDate(date:any):String{
    const publicationDate = new Date(date); 
  
      if (!isNaN(publicationDate.getTime())) { 
        const year = publicationDate.getFullYear().toString();
        const month = (publicationDate.getMonth() + 1).toString().padStart(2, '0'); 
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
      return "Unavailable";
    }
  }

  
}
