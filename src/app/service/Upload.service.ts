import { HttpClient, HttpEvent, HttpEventType, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

constructor(private http: HttpClient) { }
  // file from event.target.files[0]
  PostFile(file: File): Observable<HttpEvent<any>> {
      let url = 'http://localhost:8081/images/upload';
      let formData = new FormData();
      formData.append('file', file);
      let params = new HttpParams();

      const options = {
        params: params,
        reportProgress: true,
      };

      const req = new HttpRequest('POST', url, formData, options);
      return this.http.request(req);
    }

  GetAllFile(){
    return this.http.get(
      'http://localhost:8081/images/files'
    );
  }

  GetFileById(fileDbId : string){
    return this.http.get(
      'http://localhost:8081/images/files/' + fileDbId
    );
  }

}
