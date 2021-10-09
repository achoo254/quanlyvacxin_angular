import { RegimenDetails } from './../obj/RegimenDetails';
import { Customer } from './../obj/Customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegimenDetailsService {

constructor(private http: HttpClient) { }
  GetAllRegimenDetailsByCustomer(customerId: number) {
    return this.http.get(
      'http://localhost:8081/regimenDetails/getAll/customerId/' + customerId
    );
  }

  GetAllRegimenDetailsByMonth(year: number, inject : boolean) {
    return this.http.get(
      'http://localhost:8081/regimenDetails/getAll/'+year+'/'+inject
    );
  }

  PostRegimenDetails(regimenDetails : RegimenDetails){
    return this.http.post(
      'http://localhost:8081/regimenDetails/post/', regimenDetails
    );
  }

  PutRegimenDetails(regimenDetailsId: number, regimenDetails : RegimenDetails){
    return this.http.put(
      'http://localhost:8081/regimenDetails/put/' + regimenDetailsId, regimenDetails
    );
  }
}
