import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-no-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
})
export class NoDataComponent {
  imagePath = 'assets/images';

  @Input() title: string = 'No data found';
  @Input() subTitle: string = 'Try adjusting your query to find what you\'re looking for.';
  @Input() imgName: string = 'no-data';

  getImageUrl(): string {
    return `${this.imagePath}/${this.imgName}.png`;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    console.warn('No data image not found:', this.getImageUrl());
  }
}
