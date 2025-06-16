import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPopComponent } from './edit-pop.component';

describe('EditPopComponent', () => {
  let component: EditPopComponent;
  let fixture: ComponentFixture<EditPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
