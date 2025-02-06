import { Component, ElementRef, ViewChild, signal, inject, computed } from '@angular/core';
import { ItemBookComponent } from '../item-book/item-book.component';
import { MatDialog } from '@angular/material/dialog';
import { BooksService } from '../books.service';
import { NoDataComponent } from '../no-data/no-data.component';
import { LoaderComponent } from '../loader/loader.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-list-books',
  standalone: true,
  imports: [
    CommonModule,
    NoDataComponent,
    LoaderComponent,
    NgScrollbarModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss'],
})
export class ListBooksComponent {
  private booksService = inject(BooksService);
  private dialog = inject(MatDialog);

  @ViewChild('img') img!: ElementRef;

  pathImg = signal('https://covers.openlibrary.org/');

  books = computed(() => this.booksService.getBooks());
  isLoading = computed(() => this.booksService.loader());
  hasBooks = computed(() => this.books().length > 0);
  bookCount = computed(() => this.booksService.getBookCount());

  openDialog(book: any): void {
    this.dialog.open(ItemBookComponent, {
      width: '800px',
      data: book,
    });
  }

  onImageLoad(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target && target.naturalHeight === 1) {
      target.src = 'https://blog.breastmates.co.nz/wp-content/uploads/2019/08/placeholder-images-image_large.png';
    }
  }

  getCoverUrl(book: any): string {
    const coverId = book.cover_i;
    if (coverId) {
      return `${this.pathImg()}b/id/${coverId}-M.jpg`;
    }
    return 'https://blog.breastmates.co.nz/wp-content/uploads/2019/08/placeholder-images-image_large.png';
  }

  getAuthors(book: any): string {
    return book.author_name?.join(', ') || 'Unknown Author';
  }

  getFirstPublishYear(book: any): string {
    return book.first_publish_year?.toString() || 'Unknown';
  }
}
