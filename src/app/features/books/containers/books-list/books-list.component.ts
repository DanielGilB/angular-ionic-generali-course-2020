import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  books: Book[] = [];

  constructor(private booksSrv: BooksService, private router: Router, private loadingController: LoadingController) {}

  ngOnInit(): void {
    this.booksSrv.getBooks().subscribe((books) => (this.books = books));
  }

  navToBookDetail(id: number) {
    this.router.navigate(['/books', id]);
  }

  async removeBook(book: Book) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    this.booksSrv.deleteBook(book.id).subscribe(() => {
      this.books = this.books.filter(({ id }) => book.id !== id);
      loading.dismiss();
    });
  }
}
