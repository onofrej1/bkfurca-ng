import { Component, OnInit} from '@angular/core';
import { CrudService } from './../../crud.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  models: {};
  components = [];
  crud: CrudService;
  welcome;

  constructor(crud: CrudService) {
    this.crud = crud;
  }

  ngOnInit() {
    this.models = this.crud.getModels();
  }
}