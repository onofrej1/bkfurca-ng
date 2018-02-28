import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.css']
})
export class SidebarLayoutComponent implements OnInit {

  @Input() contentTitle: string;

  constructor() { }

  ngOnInit() {
  }

}
