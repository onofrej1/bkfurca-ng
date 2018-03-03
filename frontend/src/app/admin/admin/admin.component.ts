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
  form: any = null;

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
    });

    this.models = this.crud.getModels();
  }

  private getForm(row) {
    //this.form = {}; //zmazat neskor
    let dbColumns = this.fieldsNames || [];
    let formModel = this.model.form || {};

    //let form = {...formModel};
    let form = {};
    console.log(form);
    let order = 1;
    console.log('fields', this.fieldsNames);
    for(let key in formModel) {

      let type = 'text';
      let value = row[key] instanceof Array ? row[key].map(v => v.id) : row[key];
      console.log(key);
      
      if(formModel[key] && formModel[key].type == 'relation') {
        //console.log(form[key].resourceTable);
        this.crud.fetchOptions(formModel[key].resourceTable).subscribe(data => {
          console.log('options', data);
          let options = data.map(data => { return {value: data.id, label: data.title}});
          form[key] = {...form[key], options};
          this.form = {...this.form, key: form[key]};
          //this.options[key] = data;
        });
        type = 'select';
      }
      //const type = key === "id" ? "hidden" : form[key] && form[key].type || 'text';
      form[key] = { value, order, ...formModel[key], type };
      order++;
      if(formModel[key] === 'remove') delete form[key];
    }

    this.form = form;
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
    this.getForm(row);
  }

}


