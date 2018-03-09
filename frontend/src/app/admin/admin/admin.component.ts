import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { CrudService } from './../../crud.service';
import { HomeComponent } from './../../home/home.component';
import { MediaManagerComponent } from './../media-manager/media-manager.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  models: {};
  components = [];
  crud: CrudService;

  @ViewChild("content", { read: ViewContainerRef }) content;

  constructor(crud: CrudService, private componentFactoryResolver: ComponentFactoryResolver) {
    this.crud = crud;
  }

  loadComponent(component) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.content.clear();
    let componentRef = this.content.createComponent(componentFactory);
    //(<AdComponent>componentRef.instance).data = adItem.data;
  }

  changeContent(component) {
    this.loadComponent(component);
  }

  ngOnInit() {
    this.models = this.crud.getModels();
    this.components = [
      { component: MediaManagerComponent, menu: 'Media manager' },
      { component: HomeComponent, menu: 'Home' },

    ];
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    if (this.content) {
      this.content.destroy();
      this.content = null;
    }
  }

}