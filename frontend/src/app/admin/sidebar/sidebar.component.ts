import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CrudService } from './../../crud.service';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  @Input() models;
  crud: CrudService;
  protected modelNames: string[];

  constructor(crud: CrudService) {
    this.crud = crud;
  }

  ngOnInit() {
    this.modelNames = Object.keys(this.models);
  }

  setModel(modelName: string) {
    this.crud.setModelName(modelName);

    //this.crud.getModelName().subscribe(modelName => { console.log(modelName)});
  }

}
