import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CrudService } from './crud.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CrudComponent } from './crud/crud.component';
import { ArticlesComponent } from './articles/articles.component';
import { AdminHeaderComponent } from './admin/header/header.component';
import { AdminSidebarComponent } from './admin/sidebar/sidebar.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminFooterComponent } from './admin/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SidebarLayoutComponent } from './sidebar-layout/sidebar-layout.component';
import { FooterComponent } from './footer/footer.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { BoxComponent } from './admin/box/box.component';
//import { DynamicFormComponent } from './form/dynamic-form/dynamic-form.component';

const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: '', component: HomeComponent },
  { path: 'crud', component: CrudComponent },
  { path: 'articles', component: ArticlesComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    CrudComponent,
    ArticlesComponent,
    HeaderComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminComponent,
    AdminFooterComponent,
    HomeComponent,
    SidebarLayoutComponent,
    FooterComponent,
    DynamicFormComponent,
    BoxComponent,
    
    //DynamicFormComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
