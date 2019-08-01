import { MatSortModule } from '@angular/material/sort';
import { PersonaService } from './../../_service/persona.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Persona } from 'src/app/_model/Persona';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  dataSource: MatTableDataSource<Persona>;
  displayedColumns = ['idPersona', 'nombres', 'apellidos', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private personaService: PersonaService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.personaService.personaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.personaService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.personaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idPersona: number) {
    this.personaService.eliminar(idPersona).pipe(switchMap(() => {
      return this.personaService.listar();
    })).subscribe(data => {
      this.personaService.personaCambio.next(data);
      this.personaService.mensajeCambio.next('Se elimino');
    });
  }
  
}
