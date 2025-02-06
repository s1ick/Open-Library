import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal, inject } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  isbn?: string[];
  cover_i?: number;
}

export interface BookSearchResponse {
  docs: Book[];
  numFound: number;
  start: number;
}

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);

  response = signal<BookSearchResponse | null>(null);
  loader = signal(false);
  error = signal<string | null>(null);

  searchTitle(author: string): Observable<BookSearchResponse> {
    this.loader.set(true);
    this.error.set(null);

    return this.http.get<BookSearchResponse>(`https://openlibrary.org/search.json?author=${author}`).pipe(
      tap((response) => {
        this.response.set(response);
        this.loader.set(false);
      }),
      catchError((error: HttpErrorResponse) => {
        this.loader.set(false);
        this.error.set('Failed to load books. Please try again.');
        console.error('API Error:', error);
        return of({ docs: [], numFound: 0, start: 0 });
      })
    );
  }

  updateSearchResults(response: BookSearchResponse): void {
    this.response.set(response);
  }

  clearSearchResults(): void {
    this.response.set(null);
  }

  getBookCount() {
    return this.response()?.numFound ?? 0;
  }

  getBooks() {
    return this.response()?.docs ?? [];
  }
}
