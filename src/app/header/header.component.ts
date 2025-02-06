import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild, signal, inject } from '@angular/core';
import { BooksService } from '../books.service';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  private booksService = inject(BooksService);
  author = signal('');

  clearSearch(): void {
    this.author.set('');
    this.input.nativeElement.focus();
    this.booksService.clearSearchResults();
  }

  ngAfterViewInit(): void {
    fromEvent<KeyboardEvent>(this.input.nativeElement, 'keyup')
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        map((event: KeyboardEvent) => {
          const target = event.target as HTMLInputElement;
          const author = target.value;
          this.author.set(author);

          if (author.trim()) {
            this.booksService.searchTitle(author).subscribe();
          } else {
            this.booksService.clearSearchResults();
          }
        })
      )
      .subscribe();
  }
}
