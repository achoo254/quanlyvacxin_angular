/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegimenService } from './Regimen.service';

describe('Service: Regimen', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegimenService]
    });
  });

  it('should ...', inject([RegimenService], (service: RegimenService) => {
    expect(service).toBeTruthy();
  }));
});
