import { PersonaService } from './../../../_service/persona.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Persona } from 'src/app/_model/Persona';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-persona-editar',
  templateUrl: './persona-editar.component.html',
  styleUrls: ['./persona-editar.component.css']
})
export class PersonaEditarComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private personaService: PersonaService) { }

  ngOnInit() {
    this.form = new FormGroup({
      id : new FormControl(0),
      nombres : new FormControl(''),
      apellidos : new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.edicion = params.id != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.personaService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id : new FormControl(data.idPersona),
          nombres : new FormControl(data.nombres),
          apellidos : new FormControl(data.apellidos)
      });
    });
   }
  }

  operar() {
    const persona = new Persona();
    persona.idPersona = this.form.value.id;
    persona.nombres = this.form.value.nombres;
    persona.apellidos = this.form.value.apellidos;

    if (this.edicion) {
      this.personaService.modificar(persona).pipe(switchMap( () => {
        return this.personaService.listar();
      })).subscribe(data => {
        this.personaService.personaCambio.next(data);
        this.personaService.mensajeCambio.next('Se modificò');
      });
    } else {
      this.personaService.registrar(persona).pipe(switchMap( () => {
        return this.personaService.listar();
      })).subscribe(data => {
        this.personaService.personaCambio.next(data);
        this.personaService.mensajeCambio.next('Se registrò');
      });
    }

    this.router.navigate(['persona']);

  }

}
