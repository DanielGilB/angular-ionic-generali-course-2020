import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { BooksStorageService } from '../../services/books-storage.service';
import { FormControl, FormBuilder } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksListComponent implements OnInit {
  books$ = this.booksStorage.books$;
  form = this.formBuilder.group({
    search: new FormControl('')
  });
  search$ = this.form.get('search').valueChanges.pipe(startWith(''));
  booksFiltered$ = combineLatest([this.booksStorage.books$, this.search$]).pipe(
    map(([books, search]) => books.filter((book) => book.title?.toLowerCase().includes(search?.toLowerCase())))
  );
  loading$ = this.booksStorage.loading$;

  constructor(private booksStorage: BooksStorageService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getBooks();
  }

  navToBookDetail(id: number) {
    this.router.navigate(['/books', id]);
  }

  removeBook({ id }) {
    this.booksStorage.removeBook(id);
  }

  getBooks(event?: any) {
    this.booksStorage.loadBooks();
    event?.target.complete();
  }
}
