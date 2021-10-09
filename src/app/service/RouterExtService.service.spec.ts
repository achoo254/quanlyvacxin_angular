/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterExtServiceService } from './RouterExtService.service';

describe('Service: RouterExtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterExtServiceService]
    });
  });

  it('should ...', inject([RouterExtServiceService], (service: RouterExtServiceService) => {
    expect(service).toBeTruthy();
  }));
});
