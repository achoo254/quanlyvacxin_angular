/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomerRoomService } from './CustomerRoom.service';

describe('Service: CustomerRoom', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerRoomService]
    });
  });

  it('should ...', inject([CustomerRoomService], (service: CustomerRoomService) => {
    expect(service).toBeTruthy();
  }));
});
