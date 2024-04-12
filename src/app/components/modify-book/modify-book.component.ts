import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Book } from 'src/entities/Book';
import { Utils } from 'src/app/utils/Utils';

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

   
    this.booksService.getBookById(this.bookId).subscribe({
      next : (book) => {
        this.book = book;
        console.log(book); 
        this.prefillForm();
      },
      error : (error) => {
        console.error('Error fetching book data', error);
      }
    }
      
    );

   
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publicationDate: ['', Validators.required],
      isAvailable: [false] 
    });

    
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const formData = this.bookForm.value;
      this.booksService.updateBook(this.bookId, formData).subscribe(
        {
          next : (response) => {
            console.log('Book updated successfully');
            Utils.showSweetAlert("Success","Book modified successfully","success");
            this.router.navigate(['/list-book']);

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

      this.bookForm.patchValue({
        title: this.book.title || '',
        author: this.book.author || '',
        isAvailable: this.book.isAvailable || false
      });
  

      const publicationDate = new Date(this.book.publicationDate);
  
      if (!isNaN(publicationDate.getTime())) { 
        const year = publicationDate.getFullYear().toString();
        const month = (publicationDate.getMonth() + 1).toString().padStart(2, '0');
        const day = publicationDate.getDate().toString().padStart(2, '0');
  
        const formattedPublicationDate = `${year}-${month}-${day}`;
  
 
        this.bookForm.patchValue({
          publicationDate: formattedPublicationDate
        });
      } else {
        console.error('Invalid publication date format:', this.book.publicationDate);
      }
    }
  }

  
  
  
  
  
  

}
