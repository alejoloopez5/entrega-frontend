import { PersonaEditarComponent } from './pages/persona/persona-editar/persona-editar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonaComponent } from './pages/persona/persona.component';
import { ProductoComponent } from './pages/producto/producto.component';

const routes: Routes = [
  {path: 'persona', component: PersonaComponent, children: [
    {path: 'nuevo', component: PersonaEditarComponent },
    {path: 'edicion/:id', component: PersonaEditarComponent }
  ]},
  {path: 'producto', component: ProductoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
