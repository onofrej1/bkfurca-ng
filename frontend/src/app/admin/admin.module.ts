import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { CrudService } from "./../crud.service";
import { FileService } from "./../file.service";

import { CrudComponent } from "./crud/crud.component";
import { AdminHeaderComponent } from "./header/header.component";
import { AdminSidebarComponent } from "./sidebar/sidebar.component";
import { AdminComponent } from "./admin/admin.component";
import { AdminFooterComponent } from "./footer/footer.component";
import { DynamicFormComponent } from "./../dynamic-form/dynamic-form.component";
import { BoxComponent } from "./box/box.component";
import { MediaManagerComponent } from "./media-manager/media-manager.component";
import { CalendarModule } from "primeng/calendar";
import { FormsModule } from "@angular/forms";
import { ButtonModule, PanelModule } from "primeng/primeng";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EditorModule } from "primeng/editor";
import { DataTableModule } from "primeng/datatable";

//import { DynamicFormComponent } from './form/dynamic-form/dynamic-form.component';

const adminRoutes: Routes = [
  { path: "admin", component: AdminComponent }
  { path: "crud/:model", component: CrudComponent }
];

@NgModule({
  declarations: [
    CrudComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminComponent,
    AdminFooterComponent,
    BoxComponent,
    MediaManagerComponent,
    DynamicFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    ButtonModule,
    FormsModule,
    EditorModule,
    DataTableModule,
    PanelModule,
    RouterModule.forRoot(
      adminRoutes
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  //exports: [RouterModule],
  entryComponents: [MediaManagerComponent, CrudComponent],
  providers: [CrudService, FileService]
  //bootstrap: [AdminComponent]
})
export class AdminModule {}