import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListComponent } from './containers/books-list/books-list.component';
import { BookDetailsComponent } from './containers/book-details/book-details.component';

const routes: Routes = [
  { path: '', component: BooksListComponent },
  { path: ':id', component: BookDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {}
