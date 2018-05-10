import { ViewEncapsulation, Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { CrudService } from "../crud.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  constructor(private crud: CrudService) { }

  private items: MenuItem[];
  private menuTree: Object[] = [];

  ngOnInit() {
    this.crud.fetchData("menuItem").subscribe(data => {
      console.log(data);
      let menuItems = data.filter(i => !i.parent_id);
      for (let i in menuItems) {
        let menuItem = menuItems[i];
        let items = data.filter(i => i.parent_id === menuItem.id)
          .map(item => this.createMenuItem(item));
        this.menuTree.push(this.createMenuItem(menuItem, items));
      }
    });
  }

  createMenuItem(menuItem, subItems = []) {
    let item;
    item = {
      label: menuItem.title,
    };
    if (subItems.length > 0) {
      item.items = subItems;
    }
    if (menuItem.page_id) {
      item.routerLink = ["/page/" + menuItem.page_id];
    } else if(menuItem.link) {
      let isExternalLink = /^https?:\/\//.test(menuItem.link);

      if (isExternalLink) {
        item.url = menuItem.link;        
      } else {        
        item.routerLink = [menuItem.link];
      }
    }

    return item;
  }
}
