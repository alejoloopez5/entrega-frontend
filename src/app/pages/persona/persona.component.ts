import { PersonaService } from './../../_service/persona.service';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/_model/Persona';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  personas: Persona[];

  constructor(private personaservice: PersonaService) { }

  ngOnInit() {
    this.personaservice.listar().subscribe(data => {
      this.personas = data;
    });
  }

}
