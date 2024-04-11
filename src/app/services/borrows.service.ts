import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Borrow } from 'src/entities/Borrows';

@Injectable({
  providedIn: 'root'
})
export class BorrowsService {

  constructor(private http:HttpClient) { }

  private baseUrl = 'http://localhost:3000/borrows';

  borrowBook(userId: string | null, bookId: number): Observable<Borrow> {
    return this.http.post<Borrow>(`${this.baseUrl}/${userId}/${bookId}`, null);
  }

  returnBook(borrowId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${borrowId}/return`, null);
  }

  getBorrowsByUser(userId: string | null): Observable<Borrow[]> {
    return this.http.get<Borrow[]>(`${this.baseUrl}/${userId}/borrows`);
  }
}
