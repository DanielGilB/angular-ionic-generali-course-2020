import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { BooksRoutingModule } from './books-routing.module';
import { BooksListComponent } from './containers/books-list/books-list.component';
import { BookDetailsComponent } from './containers/book-details/book-details.component';
import { BookRowComponent } from './components/book-row/book-row.component';
import { BookFormComponent } from './components/book-form/book-form.component';

@NgModule({
  declarations: [BooksListComponent, BookDetailsComponent, BookRowComponent, BookFormComponent],
  imports: [SharedModule, BooksRoutingModule]
})
export class BooksModule {}
