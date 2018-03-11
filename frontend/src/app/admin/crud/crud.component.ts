import { Component, SimpleChanges, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { CrudService } from './../../crud.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'admin-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],

  //changeDetection: ChangeDetectionStrategy.Default
})
export class CrudComponent implements OnInit {

  objectKeys = Object.keys;
  crud: CrudService;
  data: any[];
  models;
  modelName: string;
  model;
  row: null;
  form = [];
  list = [];

  constructor(crud: CrudService, private route: ActivatedRoute, private router: Router) {
    this.crud = crud;
  }

  ngOnInit() {
    this.models = this.crud.getModels();
    this.route.params.subscribe(params => {
      this.modelName = params['model'];

      this.model = this.models[this.modelName];
      this.list = this.model.list;
      this.crud.fetchData(this.modelName);

      this.row = null;
    });

    this.crud.getData().subscribe(data => {
      this.data = data;
    });

  }

  private buildForm(row) {
    this.form = [{ name: 'id', value: row.id, type: 'hidden' }];
    let field;

    for (let prop of this.model.form) {
      let name = prop.name;
      let value = row[name] instanceof Array ? row[name].map(v => v.id) : row[name];
      field = { value, ...prop };
      if (prop && prop.type == 'relation') {
        this.fetchOptions(prop);
        field.type = 'select';
      }

      if (prop && prop.type == 'pivotRelation') {
        this.fetchOptions(prop);
        field.type = 'checklist';
      }
      this.form.push(field);
    }
  }

  fetchOptions(field) {
    this.crud.fetchOptions(field.resourceTable).subscribe(data => {
      let options = data.map(data => { 
        return { 
          value: data.id, 
          label: data[field.show]};
      });
      this.form = this.form.map(f => f.name == field.name ? { ...f, options } : f);
    });
  }

  handleForm(values) {
    this.crud.save(this.modelName, values).subscribe(model => {
      this.crud.fetchData(this.modelName);
      this.row = null;
    }, error => console.log('error', error));

    console.log('handle', values);
  }

  setRow(row: any) {
    this.row = row;
    this.buildForm(row);
  }

}
