import { Component, Inject, inject, signal } from '@angular/core';
import { BooksService } from '../books.service';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-item-book',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './item-book.component.html',
  styleUrls: ['./item-book.component.scss'],
})
export class ItemBookComponent {
  private booksService = inject(BooksService);

  pathImg = signal('https://covers.openlibrary.org/');
  bookData = signal<any>(null);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.bookData.set(data);
    this.validateBookData();
  }

  private validateBookData(): void {
    if (!this.data || !this.data.title) {
      console.error('Invalid book data:', this.data);
    }
  }

  getCoverUrl(): string {
    const coverId = this.bookData()?.cover_i;
    if (coverId) {
      return `${this.pathImg()}b/id/${coverId}-L.jpg`;
    }
    return 'https://blog.breastmates.co.nz/wp-content/uploads/2019/08/placeholder-images-image_large.png';
  }

  getAuthors(): string {
    return this.bookData()?.author_name?.join(', ') || 'Unknown Author';
  }

  getFirstPublishYear(): string {
    return this.bookData()?.first_publish_year?.toString() || 'Unknown';
  }

  getISBN(): string {
    return this.bookData()?.isbn?.[0] || 'No ISBN available';
  }

  hasSubjects(): boolean {
    return !!this.bookData()?.subject?.length;
  }

  getSubjects(): string[] {
    return this.bookData()?.subject?.slice(0, 5) || [];
  }
 addToFavorites(): void {
  const book = this.bookData();
  if (book) {
    console.log('📚 Added to favorites:', book.title);
  }
}
}
