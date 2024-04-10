import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,private booksService:BooksService,private router:Router) { }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publicationDate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const formData = this.bookForm.value;
      this.booksService.createBook(formData).subscribe(response => {
        console.log('Book added successfully', response);
        this.router.navigate(['/list-book']);
      },
      error => {
        console.error('Error adding book', error);
      });
    }
  }
}

