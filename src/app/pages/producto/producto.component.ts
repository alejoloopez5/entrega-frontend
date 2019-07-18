import { ProductoService } from './../../_service/producto.service';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/_model/Producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  productos: Producto[];

  constructor(private productoservice: ProductoService) { }

  ngOnInit() {
    this.productoservice.listar().subscribe(data => {
      this.productos = data;
    });
  }
}
