import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BooksService } from './books.service';
import { Book } from '../models/book.model';

export interface State {
  books: Book[];
  loading: boolean;
  error: any;
}

@Injectable({
  providedIn: 'root'
})
export class BooksStorageService {
  // tslint:disable-next-line: variable-name
  private readonly _storage = new BehaviorSubject<State>({
    books: [],
    loading: false,
    error: null
  });
  state$: Observable<State> = this._storage.asObservable();
  books$: Observable<Book[]> = this.state$.pipe(map(({ books }) => books));
  loading$: Observable<boolean> = this.state$.pipe(map(({ loading }) => loading));

  constructor(private booksSrv: BooksService) {}

  get data() {
    return this._storage.getValue();
  }

  loadBooks(): void {
    this._storage.next({ ...this.data, loading: true, error: null });
    this.booksSrv.getBooks().subscribe(
      (books) => this._storage.next({ ...this.data, books, loading: false }),
      (error) => this._storage.next({ ...this.data, loading: false, error })
    );
  }

  loadBook(id: number): void {
    this._storage.next({ ...this.data, loading: !this.data.books.find((book) => book.id === id), error: null });
    this.booksSrv.getBook(id).subscribe(
      (bookLoaded) =>
        this._storage.next({
          ...this.data,
          books: [...this.data.books.filter((book) => id !== book.id), bookLoaded],
          loading: false
        }),
      (error) => this._storage.next({ ...this.data, loading: false, error })
    );
  }

  createBook(book: Book): void {
    this._storage.next({ ...this.data, loading: true, error: null });
    this.booksSrv.createBook(book).subscribe(
      (bookCreated) => this._storage.next({ ...this.data, books: [...this.data.books, bookCreated], loading: false }),
      (error) => this._storage.next({ ...this.data, loading: false, error })
    );
  }

  updateBook(book: Book): void {
    this._storage.next({ ...this.data, loading: true, error: null });
    this.booksSrv.updateBook({ ...(this.data.books.find((bookf) => bookf.id === book.id) ?? {}), ...book }).subscribe(
      (bookUpdated) =>
        this._storage.next({
          ...this.data,
          books: [...this.data.books.filter(({ id }) => id !== book.id), bookUpdated].sort((a, b) => a.id - b.id),
          loading: false
        }),
      (error) => this._storage.next({ ...this.data, loading: false, error })
    );
  }

  removeBook(id: number) {
    this._storage.next({ ...this.data, loading: true, error: null });
    this.booksSrv.deleteBook(id).subscribe(
      () =>
        this._storage.next({
          ...this.data,
          books: this.data.books.filter((book) => id !== book.id),
          loading: false
        }),
      (error) => this._storage.next({ ...this.data, loading: false, error })
    );
  }
}
