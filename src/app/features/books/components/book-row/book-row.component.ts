import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-row',
  templateUrl: './book-row.component.html',
  styleUrls: ['./book-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookRowComponent implements OnInit {
  @Input() book: Book;
  @Output() detail = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  bookDetail() {
    this.detail.next(this.book.id);
  }

  removeBook() {
    this.remove.next(this.book.id);
  }
}
