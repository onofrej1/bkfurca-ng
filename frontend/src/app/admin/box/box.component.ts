import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'admin-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  @Input() header: string;

  constructor() { }

  ngOnInit() {
  }

}
