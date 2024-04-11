import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBorrowComponent } from './list-borrow.component';

describe('ListBorrowComponent', () => {
  let component: ListBorrowComponent;
  let fixture: ComponentFixture<ListBorrowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBorrowComponent]
    });
    fixture = TestBed.createComponent(ListBorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
