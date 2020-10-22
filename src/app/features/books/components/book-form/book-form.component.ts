import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BookLanguage } from '../../models/book-language.enum';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() isNew = false;
  @Output() submitForm = new EventEmitter<Partial<Book>>();

  languageTypes = BookLanguage;

  constructor() {}

  ngOnInit(): void {}

  sendForm(formValue: Partial<Book>) {
    this.submitForm.emit(formValue);
  }

  get title() {
    return this.form.get('title');
  }

  get language() {
    return this.form.get('language');
  }
}
