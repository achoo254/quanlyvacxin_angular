import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegimenService {

constructor(private http: HttpClient) { }
  GetAllRegimen() {
    return this.http.get(
      'http://localhost:8081/regimen/getAll/'
    );
  }

  GetRegimenById(regimenId : number) {
    return this.http.get(
      'http://localhost:8081/regimen/get/' + regimenId
    );
  }
}
