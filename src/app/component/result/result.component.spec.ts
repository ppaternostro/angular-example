import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Post } from '../../model/post';
import { PostService } from '../../service/rest/post/post.service';
import { ResultComponent } from './result.component';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  const post = { id: 1, userId: 1, title: 'Title', body: 'Body' } as Post;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultComponent],
      providers: [provideHttpClientTesting(), PostService],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain zero rows and the CREATE button should be disabled on initial state', () => {
    const rows = fixture.debugElement.queryAll(By.css('table tbody tr')).length;
    const createButton = fixture.debugElement.query(
      By.css('#result-create'),
    ).nativeElement;

    expect(rows).toBe(0);
    expect(createButton.disabled).toBeTruthy();
  });

  it('should contain one row and the CREATE button should be enabled on row selection', () => {
    component.dataService.updatePosts(of([post]));

    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('table tbody tr')).length;
    const createButton = fixture.debugElement.query(
      By.css('#result-create'),
    ).nativeElement;

    expect(rows).toBe(1);
    expect(createButton.disabled).toBeTruthy();

    component.onRowClick(post);

    fixture.detectChanges();

    expect(createButton.disabled).toBeFalsy();
  });

  it('should contain one row and clicking the DELETE icon should remove the row', () => {
    component.dataService.updatePosts(of([post]));

    fixture.detectChanges();

    let rows = fixture.debugElement.queryAll(By.css('table tbody tr')).length;
    const createButton = fixture.debugElement.query(
      By.css('#result-create'),
    ).nativeElement;

    expect(rows).toBe(1);
    expect(createButton.disabled).toBeTruthy();

    spyOn(component, 'onDeleteClick').and.callFake(() => {
      component.dataService.updatePosts(of([]));
    });

    const deleteIcon = fixture.debugElement.query(
      By.css('#result-delete'),
    ).nativeElement;

    deleteIcon.click();

    fixture.detectChanges();

    rows = fixture.debugElement.queryAll(By.css('table tbody tr')).length;

    expect(rows).toBe(0);
  });

  it('should contain one row and clicking the EDIT icon should display TITLE & BODY input fields', () => {
    component.dataService.updatePosts(of([post]));

    fixture.detectChanges();

    let rows = fixture.debugElement.queryAll(By.css('table tbody tr')).length;
    const createButton = fixture.debugElement.query(
      By.css('#result-create'),
    ).nativeElement;

    expect(rows).toBe(1);
    expect(createButton.disabled).toBeTruthy();

    const editIcon = fixture.debugElement.query(
      By.css('#result-edit'),
    ).nativeElement;

    editIcon.click();

    fixture.detectChanges();

    let titleInput = fixture.debugElement.query(
      By.css('#result-title-input'),
    ).nativeElement;

    let bodyInput = fixture.debugElement.query(
      By.css('#result-body-input'),
    ).nativeElement;

    let saveIcon = fixture.debugElement.query(
      By.css('#result-save'),
    ).nativeElement;

    let cancelIcon = fixture.debugElement.query(
      By.css('#result-cancel'),
    ).nativeElement;

    expect(titleInput).toBeTruthy();
    expect(bodyInput).toBeTruthy();
    expect(saveIcon).toBeTruthy();
    expect(cancelIcon).toBeTruthy();

    cancelIcon.click();

    fixture.detectChanges();

    titleInput = fixture.debugElement.query(By.css('#result-title-input'));
    bodyInput = fixture.debugElement.query(By.css('#result-body-input'));
    saveIcon = fixture.debugElement.query(By.css('#result-save'));
    cancelIcon = fixture.debugElement.query(By.css('#result-cancel'));

    expect(titleInput).toBeFalsy();
    expect(bodyInput).toBeFalsy();
    expect(saveIcon).toBeFalsy();
    expect(cancelIcon).toBeFalsy();
  });

  it('should contain one row and editing the TITLE & BODY input fields then clicking the SAVE icon will persist', () => {
    component.dataService.updatePosts(of([post]));

    fixture.detectChanges();

    let rows = fixture.debugElement.queryAll(By.css('table tbody tr')).length;
    const createButton = fixture.debugElement.query(
      By.css('#result-create'),
    ).nativeElement;

    expect(rows).toBe(1);
    expect(createButton.disabled).toBeTruthy();

    const editIcon = fixture.debugElement.query(
      By.css('#result-edit'),
    ).nativeElement;

    editIcon.click();

    fixture.detectChanges();

    let titleInput = fixture.debugElement.query(
      By.css('#result-title-input'),
    ).nativeElement;

    let bodyInput = fixture.debugElement.query(
      By.css('#result-body-input'),
    ).nativeElement;

    let saveIcon = fixture.debugElement.query(
      By.css('#result-save'),
    ).nativeElement;

    expect(titleInput).toBeTruthy();
    expect(bodyInput).toBeTruthy();
    expect(saveIcon).toBeTruthy();

    spyOn(component, 'onSaveClick').and.callFake((element) => {
      element.editable = false;
      component.originalPosts.delete(element.id);
    });

    component.selection.selected[0].title = 'Title Change';
    component.selection.selected[0].body = 'Body Change';

    fixture.detectChanges();

    saveIcon.click();

    fixture.detectChanges();

    titleInput = fixture.debugElement.query(By.css('#result-title-input'));
    bodyInput = fixture.debugElement.query(By.css('#result-body-input'));
    saveIcon = fixture.debugElement.query(By.css('#result-save'));

    expect(titleInput).toBeFalsy();
    expect(bodyInput).toBeFalsy();
    expect(saveIcon).toBeFalsy();

    const title = fixture.debugElement.query(
      By.css('#result-title'),
    ).nativeElement;
    const body = fixture.debugElement.query(
      By.css('#result-body'),
    ).nativeElement;

    expect(title.textContent.trim()).toBe('Title Change');
    expect(body.textContent.trim()).toBe('Body Change');
  });
});
