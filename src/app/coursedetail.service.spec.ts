import { TestBed } from '@angular/core/testing';

import { CoursedetailService } from './coursedetail.service';

describe('CoursedetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoursedetailService = TestBed.get(CoursedetailService);
    expect(service).toBeTruthy();
  });
});
