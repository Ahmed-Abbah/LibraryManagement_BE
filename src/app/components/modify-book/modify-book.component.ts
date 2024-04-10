import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Book } from 'src/entities/Book';

@Component({
  selector: 'app-modify-book',
  templateUrl: './modify-book.component.html',
  styleUrls: ['./modify-book.component.css']
})
export class ModifyBookComponent {
  bookForm!: FormGroup | any ;
  bookId!: number | any ;
  book!:Book;

  constructor(private fb: FormBuilder,
     private http: HttpClient,
      private route: ActivatedRoute,
      private booksService : BooksService,
    private router:Router) { }

  ngOnInit(): void {
    this.bookId = +this.route.snapshot.paramMap.get('id')!;

    // Fetch book data from backend and populate the form
    this.booksService.getBookById(this.bookId).subscribe(
      (book) => {
        this.book = book;
        console.log(book); 
        this.prefillForm(); // Prefill the form after fetching book data
      },
      (error) => {
        console.error('Error fetching book data', error);
      }
    );

    // Initialize the form
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publicationDate: ['', Validators.required],
      isAvailable: [false] // Assuming it's not required
    });

    
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const formData = this.bookForm.value;
      this.booksService.updateBook(this.bookId, formData).subscribe(
        {
          next : (response) => {
            console.log('Book updated successfully');
            this.router.navigate(['/list-book']);
            // You can add further logic here, e.g., redirect to a different page
          },
          error : (error) => {
            console.error('Error updating book', error);
          }
        }
      );
    }
  }

  prefillForm(): void {
    if (this.book) {
      // Update the form controls with book data
      this.bookForm.patchValue({
        title: this.book.title || '',
        author: this.book.author || '',
        isAvailable: this.book.isAvailable || false
      });
  
      // Format publication date to "yyyy-MM-dd" format
      const publicationDate = new Date(this.book.publicationDate); // Convert ISO string to Date object
  
      if (!isNaN(publicationDate.getTime())) { // Check if the conversion was successful
        const year = publicationDate.getFullYear().toString();
        const month = (publicationDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
        const day = publicationDate.getDate().toString().padStart(2, '0');
  
        const formattedPublicationDate = `${year}-${month}-${day}`;
  
        // Set the formatted publication date in the form
        this.bookForm.patchValue({
          publicationDate: formattedPublicationDate
        });
      } else {
        console.error('Invalid publication date format:', this.book.publicationDate);
      }
    }
  }

  
  
  
  
  
  

}
