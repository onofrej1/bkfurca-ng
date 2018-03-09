import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../crud.service';

@Component({
  selector: 'admin-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  objectKeys = Object.keys;
  crud: CrudService;
  data: any[];
  fields: any[];
  fieldsNames: string[];
  models: {};
  modelName: string;
  model: any;
  row: null;
  form = [];
  list = [];

  constructor(crud: CrudService) {
    this.crud = crud;
  }

  ngOnInit() {
    this.models = this.crud.getModels();
    //this.model = this.models[modelName];
    this.crud.getData().subscribe(data => {
      this.data = data;
    });

    this.crud.getModelName().subscribe(modelName => {
      this.modelName = modelName;
      
      this.model = this.models[modelName];
      console.log(this.model);
      this.row = null;
      this.getList();
    });
  }

  private getForm(row) {
    this.form = [{name: 'id', value: row.id, type: 'hidden'}];
    let field;

    for (let prop of this.model.form) {
      let name = prop.name;
      let value = row[name] instanceof Array ? row[name].map(v => v.id) : row[name];
      field = { value, ...prop };
      if (prop && prop.type == 'relation') {
        this.fetchOptions(prop);
        field.type = 'checklist';
      }    
      this.form.push(field);
    }

    console.log('form', this.form);
  }

  fetchOptions(field) {
    this.crud.fetchOptions(field.resourceTable).subscribe(data => {
      let options = data.map(data => { return { value: data.id, label: data[field.show] } });
      this.form = this.form.map(f => f.name == field.name ? {...f, options} : f);
    });
  }

  getList() {
    this.list = this.model ? this.model.list : [];
    console.log(this.model.list);
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
