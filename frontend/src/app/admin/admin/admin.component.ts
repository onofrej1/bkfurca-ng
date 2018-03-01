import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../crud.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  objectKeys = Object.keys;
  crud: CrudService;
  data: any[];
  fields: any[];
  fieldsNames: string[];
  models: {};
  modelName: string;
  model;
  row: null;
  form: any;

  constructor(crud: CrudService) {
    this.crud = crud;
  }

  ngOnInit() {
    this.crud.getData().subscribe(data => {
      console.log('get data');
      this.data = data;
    });

    this.crud.getFields().subscribe(data => {
      console.log('get fields');
      this.fields = data;
      this.fieldsNames = Object.keys(data);
      //this.getForm();
    });

    this.crud.getModelName().subscribe(modelName => {
      console.log('get model name');
      this.modelName = modelName;
      this.model = this.models[modelName];
      this.row = null;       
    });

    this.models = this.crud.getModels();
    console.log(this.models);
  }

  private getForm() {
    this.form = {}; //zmazat neskor
    let dbColumns = this.fieldsNames || [];
    let form = this.model.form || {};

    this.form = {...form};
    let order = 1;
    console.log('fields', this.fieldsNames);
    this.fieldsNames.forEach(key => {
      const type = 'text';
      //const type = key === "id" ? "hidden" : form[key] && form[key].type || 'text';
      this.form[key] = { type, order, ...form[key] };
      order++;
      if(form[key] === 'remove') delete this.form[key];
    });
    console.log('form', this.form);
    
  }

  getList() {

  }

  handleForm(values) {
    this.crud.save(this.modelName, values).subscribe(model => {
      this.crud.setModelName(this.modelName);
      this.row = null;
    }, error => console.log('error', error));

    console.log('handle', values);
  }

  setRow(row: any) {
    this.row = row;
    this.getForm();
  }

}


