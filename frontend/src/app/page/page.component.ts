import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { CrudService } from './../crud.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  page: any;

  constructor(private crud: CrudService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let pageId = params["id"];
      this.crud.fetchData('page').subscribe(data => {
        this.page = data.find(page => page.id == pageId);        
      });
    })
  }

}
