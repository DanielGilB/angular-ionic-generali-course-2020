import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';
import { BooksStorageService } from '../../services/books-storage.service';
import { map, tap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent implements OnInit {
  book$: Observable<Book>;
  loading$ = this.booksStorage.loading$;

  isNew = false;
  form = this.formBuilder.group({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    language: new FormControl('', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private booksStorage: BooksStorageService
  ) {}

  ngOnInit(): void {
    const id: string | number = this.route.snapshot.params.id;
    this.isNew = id === 'new';
    this.book$ = this.booksStorage.books$.pipe(
      map((books) => books?.find((book) => book.id === +id) ?? {}),
      tap((book) => (book ? this.form.patchValue(book) : ''))
    );

    if (!this.isNew) {
      this.booksStorage.loadBook(+id);
    }
  }

  updateBook({ title, language }: Partial<Book>) {
    this.booksStorage.updateBook({ id: +this.route.snapshot.params.id, title, language });
  }

  createBook({ title, language }: Partial<Book>) {
    this.booksStorage.createBook({ title, language });
  }
}
