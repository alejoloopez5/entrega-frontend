import { ProductoDialogComponent } from './producto-dialog/producto-dialog.component';
import { ProductoService } from './../../_service/producto.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/_model/Producto';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  dataSource: MatTableDataSource<Producto>;
  displayedColumns = ['idProducto', 'nombre', 'marca', 'acciones'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private productoservice: ProductoService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.productoservice.productoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.productoservice.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.productoservice.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog(producto?: Producto) {
    const prod = producto != null ? producto : new Producto();
    this.dialog.open(ProductoDialogComponent, {
      width: '250px',
      data: prod
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(producto: Producto) {

    this.productoservice.eliminar(producto.idProducto).pipe(switchMap(() => {
      return this.productoservice.listar();
    })).subscribe(data => {
      this.productoservice.productoCambio.next(data);
      this.productoservice.mensajeCambio.next('Se elimino');
    });

  }

}
