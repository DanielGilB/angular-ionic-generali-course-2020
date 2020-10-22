import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}/books`);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${environment.apiUrl}/books/${id}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${environment.apiUrl}/books`, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${environment.apiUrl}/books/${book.id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/books/${id}`);
  }
}
