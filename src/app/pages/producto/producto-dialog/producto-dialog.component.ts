import { ProductoService } from './../../../_service/producto.service';
import { Producto } from './../../../_model/Producto';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-producto-dialog',
  templateUrl: './producto-dialog.component.html',
  styleUrls: ['./producto-dialog.component.css']
})
export class ProductoDialogComponent implements OnInit {

  producto: Producto;

  // tslint:disable-next-line:max-line-length
  constructor(private dialogRef: MatDialogRef<ProductoDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: Producto, private productoservice: ProductoService) { }

  ngOnInit() {
    this.producto = new Producto();
    this.producto.idProducto = this.data.idProducto;
    this.producto.nombre = this.data.nombre;
    this.producto.marca = this.data.marca;
  }

  cancelar() {
    this.dialogRef.close();
  }

  operar() {
    if (this.producto != null && this.producto.idProducto > 0) {
      // BUENA PRACTICA
      this.productoservice.modificar(this.producto).pipe(switchMap(() => {
        return this.productoservice.listar();
      })).subscribe(productos => {
        this.productoservice.productoCambio.next(productos);
        this.productoservice.mensajeCambio.next('SE MODIFICO');
      });
    } else {
      this.productoservice.registrar(this.producto).pipe(switchMap(() => {
        return this.productoservice.listar();
      })).subscribe(productos => {
        this.productoservice.productoCambio.next(productos);
        this.productoservice.mensajeCambio.next('SE REGISTRO');
      });
    }
    this.dialogRef.close();
  }

}
