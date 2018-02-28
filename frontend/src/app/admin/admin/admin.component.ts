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
      this.data = data;
    });

    this.crud.getFields().subscribe(data => {
      this.fields = data;
      this.fieldsNames = Object.keys(data);
      this.getForm();
    });

    this.crud.getModelName().subscribe(modelName => {
      this.modelName = modelName;
      this.model = this.models[modelName];
      this.row = null;      
    });

    this.models = this.crud.getModels();
    console.log(this.models);
  }

  private getForm() {
    this.form = {}; //zmazat neskor
    let dbColumns = this.fieldsNames;
    let form = this.model.form || {};

    this.form = {...form};
    let order = 1;

    for (let key of dbColumns) {
      const type = key === "id" ? "hidden" : form[key].type || 'text';
      this.form[key] = { type, order, ...form[key] };
      order++;
      //if(form[key] === 'hidden') delete this.form[key];
    }
    console.log('form', this.form);
    
  }

  getList() {

  }

  handleForm(values) {
    /*this.crud.save(this.modelName, values).subscribe(model => {
      console.log('saved', model);
    }, error => console.log('error', error));*/
    console.log('handle', values);
  }

  setRow(row: any) {
    this.row = row;
  }

  getFormx() {
    return {
      name: {
        label: 'Name',
        value: 'Juri',
        type: 'text',
        validation: {
          required: true
        }
      },
      email: {
        label: 'Email',
        value: 'mail',
        type: 'text',
        validation: {
          required: true
        }
      },
      city: {
        label: 'City',
        value: '39010',
        type: 'select',
        options: [
          { label: "(choose one)", value: '' },
          { label: "Bolzano", value: '39100' },
          { label: "Meltina", value: '39010' },
          { label: "Appiano", value: '39057' }
        ],
      }

    }
  }
}


