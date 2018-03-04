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
  options: {};
  fieldsNames: string[];
  models: {};
  modelName: string;
  model;
  row: null;
  form: Object[] = [];
  list: Object[] = [];

  constructor(crud: CrudService) {
    this.crud = crud;
  }

  ngOnInit() {
    this.crud.getData().subscribe(data => {
      this.data = data;
    });

    this.crud.getFields().subscribe(data => {
      this.fields = data;
      this.fieldsNames = Object.keys(data);
      //this.getForm();
    });

    this.crud.getModelName().subscribe(modelName => {
      this.modelName = modelName;
      this.model = this.models[modelName];
      this.row = null;
      this.getList();
    });

    this.models = this.crud.getModels();
  }

  private getForm(row) {
    this.form = [];
    let field;

    for (let prop of this.model.form) {
      let name = prop.name;
      let value = row[name] instanceof Array ? row[name].map(v => v.id) : row[name];
      field = { value, ...prop };
      if (prop && prop.type == 'relation') {
        //this.fetchOptions(prop, prop.resourceTable);
        field.type = 'select';
      }
      
      console.log(field);
      this.form.push(field);
    }

    //this.form = form;
    console.log('form', this.form);
  }

  fetchOptions(field, resource) {
    this.crud.fetchOptions(resource).subscribe(data => {
      let options = data.map(data => { return { value: data.id, label: data[field.show] } });
      //let field = { ...this.form[field.field], options };
      //this.form = { ...this.form, [key]: field };
    });
  }

  getList() {
    this.list = this.model.list || [];
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
    this.getForm(row);
  }

}