import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { CrudService } from "./crud.service";
import { FileService } from "./file.service";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ArticlesComponent } from "./articles/articles.component";
import { HomeComponent } from "./home/home.component";
import { SidebarLayoutComponent } from "./sidebar-layout/sidebar-layout.component";
import { FooterComponent } from "./footer/footer.component";
import { DynamicFormComponent } from "./dynamic-form/dynamic-form.component";

import { CalendarModule } from "primeng/calendar";
import { FormsModule } from "@angular/forms";
import { ButtonModule, PanelModule } from "primeng/primeng";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EditorModule } from "primeng/editor";
import { DataTableModule } from "primeng/datatable";
import { MenubarModule } from "primeng/menubar";
import { MenuItem } from "primeng/api";

import { AdminModule } from "./admin/admin.module";
import { PageComponent } from './page/page.component';

//import { DynamicFormComponent } from './form/dynamic-form/dynamic-form.component';

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  //{ path: 'xxx', component: MediaManagerComponent },
  { path: "clanky", component: ArticlesComponent },
  { path: "page/:id", component: PageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    HeaderComponent,
    HomeComponent,
    SidebarLayoutComponent,
    FooterComponent,
    PageComponent
    //DynamicFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    ButtonModule,
    MenubarModule,
    FormsModule,
    EditorModule,
    DataTableModule,
    PanelModule,
    AdminModule,
    RouterModule.forRoot(
      appRoutes
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  //entryComponents: [MediaManagerComponentCrudComponent],
  providers: [CrudService, FileService],
  bootstrap: [AppComponent]
})
export class AppModule {}
