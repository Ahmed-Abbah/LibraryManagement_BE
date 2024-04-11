import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/entities/Book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http:HttpClient) { }

  private baseUrl = 'http://localhost:3000/books'; // Replace with your actual backend URL

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}`);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}`, book);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  searchBooks(query: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/search?q=${query}`);
  }

  searchBookByTitle(title: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/search/title/${title}`);
  }

  searchBooksByAuthor(author: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/search/author/${author}`);
  }

  
  
}
