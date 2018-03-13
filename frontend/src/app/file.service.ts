import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FileService {

  constructor(private http: HttpClient) { }

  //private data = new Subject<any[]>();
  private fields = new Subject<any[]>();

  private baseUrl = 'http://localhost:1337';

  

  getFiles() {
    const url: string = this.baseUrl + '/files';

    return this.http.post<any[]>(url, {path: './frontend/src/assets/media'});
  }

}
