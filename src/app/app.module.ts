import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModifyBookComponent } from './components/modify-book/modify-book.component';
import { CommonModule } from '@angular/common';
import { ListBookComponent } from './components/list-book/list-book.component';
import { StatusColorPipe } from './pipes/status-color.pipe';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  { path: 'add-book', component: AddBookComponent },
  { path: 'modify-book/:id', component: ModifyBookComponent },
  { path: 'list-book', component: ListBookComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo: '', pathMatch: 'full' }, // Redirect to add-book component by default
];


@NgModule({
  declarations: [
    AppComponent,
    AddBookComponent,
    NavbarComponent,
    ModifyBookComponent,
    ListBookComponent,
    StatusColorPipe,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
