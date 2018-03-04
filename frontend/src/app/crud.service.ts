import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import models from './CrudModels';

@Injectable()
export class CrudService {

  constructor(private http: HttpClient) { }

  private modelName = new Subject<string>();
  private data = new Subject<any[]>();
  private fields = new Subject<any[]>();

  setModelName(modelName: string) {
    this.modelName.next(modelName);
    this.fetchData(modelName);
    this.fetchFields(modelName);
  }

  getModelName(): Observable<string> {
    return this.modelName.asObservable();
  }

  public getModels() {
    return models;
  }
  
  public getData(): Observable<any[]> {
    return this.data.asObservable();
  }

  public getFields(): Observable<any[]> {
    return this.fields.asObservable();
  }

  public fetchFields(modelName: string) {
    const url: string = 'http://localhost:1337/api/' + modelName +'/fields';
    return this.http.get<any[]>(url).subscribe(data => this.fields.next(data));
  }

  public fetchOptions(modelName: string) {
    const url: string = 'http://localhost:1337/api/' + modelName;
    return this.http.get<any[]>(url);
  }

  public fetchData(modelName: string) {
    const url: string = 'http://localhost:1337/api/' + modelName;
    return this.http.get<any[]>(url).subscribe(data => this.data.next(data));
  }

  public save(modelName: string, model: any) {
    let method = model.id ? 'put' : 'post';
    console.log(model);
    let param = model.id ? '/'+model.id : ''; 
    const url: string = 'http://localhost:1337/api/' + modelName + param;
    return this.http[method](url, model);
  }



}
