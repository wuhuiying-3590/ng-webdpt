import { TestBed } from '@angular/core/testing';

import { EditPopService } from './edit-pop.service';

describe('EditPopService', () => {
  let service: EditPopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditPopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
