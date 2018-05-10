import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ApplicationRef } from "@angular/core";
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
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import {
  removeNgStyles,
  createNewHosts,
  bootloader,
  createInputTransfer,
  hmrModule
} from "@angularclass/hmr";

import { AdminModule } from "./admin/admin.module";
import { PageComponent } from "./page/page.component";

//import { DynamicFormComponent } from './form/dynamic-form/dynamic-form.component';

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  //{ path: 'xxx', component: MediaManagerComponent },
  { path: "articles", component: ArticlesComponent },
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
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    if (!store || !store.state) return;
    console.log("HMR store", store);
    console.log("store.state.data:", store.state.data);
    // inject AppStore here and update it
    // this.AppStore.update(store.state)
    if ("restoreInputValues" in store) {
      store.restoreInputValues();
    }
    // change detection
    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }
  hmrOnDestroy(store) {
    var cmpLocation = this.appRef.components.map(
      cmp => cmp.location.nativeElement
    );
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // inject your AppStore and grab state then set it on store
    // var appState = this.AppStore.get()
    store.state = { data: "yolo" };
    // store.state = Object.assign({}, appState)
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
    // anything you need done the component is removed
  }
}

export function main() {
  return (
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      // use `hmrModule` or the "@angularclass/hmr-loader"
      .then((ngModuleRef: any) => {
        // `module` global ref for webpackhmr
        // Don't run this in Prod
        return hmrModule(ngModuleRef, module);
      })
  );
}

// boot on document ready
bootloader(main);
