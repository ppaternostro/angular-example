import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../service/data/data.service';
import { PostService } from '../../service/rest/post/post.service';

@Component({
  selector: 'app-search',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements AfterViewInit {
  private postService = inject(PostService);
  private dataService = inject(DataService);

  // { read: ElementRef } required to reveal button's nativeElement attribute
  // https://blog.angular-university.io/angular-viewchild/
  @ViewChild('search', { read: ElementRef })
  search!: ElementRef;

  @ViewChild('searchText')
  searchText!: ElementRef;

  selected = 'All';

  ngAfterViewInit(): void {
    this.searchText.nativeElement.disabled = true;
  }

  onSelectionChanged(value: string): void {
    this.searchText.nativeElement.value = '';
    this.searchText.nativeElement.disabled = value === 'All';
    this.search.nativeElement.disabled =
      !this.searchText.nativeElement.disabled;
  }

  onSearchClick(): void {
    if (this.searchText.nativeElement.disabled) {
      this.dataService.updatePosts(this.postService.getPosts());
    } else {
      this.dataService.updatePost(
        this.postService.getPost(this.searchText.nativeElement.value),
      );
    }
  }

  onInputChange(event: Event): void {
    this.search.nativeElement.disabled =
      // HTMLInputElement cast required to reveal value attribute
      (event.target as HTMLInputElement).value.length === 0;
  }
}
