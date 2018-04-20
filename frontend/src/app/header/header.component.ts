import { ViewEncapsulation, Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { CrudService } from "../crud.service";

@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  constructor(private crud: CrudService) {}

  private items: MenuItem[];
  private menuTree: Object[] = [];

  ngOnInit() {
    //let menuTree = [];
    let menuTree = this.menuTree;

    this.crud.fetchData("menuItem").subscribe(data => {
      console.log(data);
      console.log(this.menuTree);
      for (let i in data) {
        let menuItem = data[i];
        let items = data.filter(i => i.parent_id === menuItem.id);

        let item = {
          label: menuItem.title
        };
        this.menuTree.push(item);
        //console.log(this.menuTree);
      }
    });

    this.items = [
      {
        label: "File",
        items: [
          { label: "New", icon: "fa-plus", routerLink: ["/page/2"] },
          { label: "Open", icon: "fa-download" },
          {
            label: "aaa",
            items: [
              { label: "New", icon: "fa-plus" },
              { label: "Open", icon: "fa-download" }
            ]
          }
        ]
      },
      {
        label: "Edit",
        items: [
          { label: "Undo", icon: "fa-refresh" },
          { label: "Redo", icon: "fa-repeat" }
        ]
      }
    ];
  }
}
