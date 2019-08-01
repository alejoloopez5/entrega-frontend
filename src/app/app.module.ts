import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonaComponent } from './pages/persona/persona.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonaEditarComponent } from './pages/persona/persona-editar/persona-editar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductoDialogComponent } from './pages/producto/producto-dialog/producto-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    ProductoComponent,
    PersonaEditarComponent,
    ProductoDialogComponent
  ],
  entryComponents: [ProductoDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
