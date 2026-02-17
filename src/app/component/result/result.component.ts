/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectionModel } from '@angular/cdk/collections';
import { Component, computed, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { Post } from '../../model/post';
import { DataService } from '../../service/data/data.service';
import { PostService } from '../../service/rest/post/post.service';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-result',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatIcon,
  ],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent {
  private _dataSource: MatTableDataSource<Post> = new MatTableDataSource<Post>(
    [],
  );
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  originalPosts = new Map<number, Post>();
  displayedColumns: string[] = ['id', 'userId', 'title', 'body', 'action'];
  createDisabled = true;
  dataService = inject(DataService);
  postService = inject(PostService);
  readonly dialog = inject(MatDialog);
  selection = new SelectionModel<Post>(false, []);

  dataSource = computed(() => {
    this.dataService
      .post()
      .pipe(
        catchError((err) => {
          // Clear out the table contents
          this.dataService.updatePosts(of([]));

          // Set the Delete and Create buttons disabled
          this.createDisabled = true;

          // Rethrow for global error handler
          return throwError(() => err);
        }),
      )
      .subscribe((data) => {
        this._dataSource.data = data;
        this._dataSource.sort = this.sort;
        this._dataSource.paginator = this.paginator;

        this.selection.clear();
        this.createDisabled = true;
      });
    return this._dataSource;
  });

  onRowClick(row: Post): void {
    this.selection.select(row);
    this.createDisabled = false;
  }

  onEditClick(element: any): void {
    element.editable = true;
    this.originalPosts.set(element.id, JSON.parse(JSON.stringify(element)));
  }

  onDeleteClick(element: Post): void {
    this.postService.deletePost(element).subscribe(() => {
      this.createDisabled = this.selection.deselect(element) ?? true;

      // Filter out the non-deleted elements
      this._dataSource.data = this._dataSource.data.filter(
        (post) => post !== element,
      );

      // Signal update
      this.dataService.updatePosts(of(this._dataSource.data));
    });
  }

  onSaveClick(element: any): void {
    this.postService.savePost(element).subscribe((_post) => {
      element.editable = false;
      this.originalPosts.delete(element.id);
    });
  }

  onCancelClick(element: any): void {
    // Retrieve pre-edit original post
    const original = this.originalPosts.get(element.id);

    // Reset to the pre-edit original post values
    element.title = original?.title;
    element.body = original?.body;
    element.editable = false;

    // Remove pre-edit original post from map
    this.originalPosts.delete(element.id);
  }

  onCreateClick(selected: Post[]): void {
    const dialogConfig = new MatDialogConfig();

    // Prevents closing the dialog by clicking outside (modal)
    dialogConfig.disableClose = true;

    dialogConfig.data = { userId: selected[0].userId };

    const dialogRef = this.dialog.open(CreateComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((result) => {
          const createdPost: Observable<Post> =
            result.data !== undefined
              ? this.postService.createPost(result.data)
              : of();

          return createdPost;
        }),
      )
      .subscribe((data: Post) => {
        if (data.id) {
          // Insert the newly created post at the selected index
          this._dataSource.data.splice(
            this._dataSource.data.indexOf(this.selection.selected[0]),
            0,
            data,
          );

          // Signal update
          this.dataService.updatePosts(of(this._dataSource.data));
        }
      });
  }
}
