import { Component, OnInit } from '@angular/core';
import { CrudService } from './../crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any;

  constructor(private crud: CrudService) {
    
  }

  ngOnInit() {

    this.crud.fetchData('Page').subscribe(data => {
      this.data = data;
      console.log(data);
    });
  }

}
