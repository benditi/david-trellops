import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  products$: Observable<Product[]>

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts()
    this.products$ = this.productService.products$
  }

}
