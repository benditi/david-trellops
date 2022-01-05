import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Filter } from 'src/app/models/filterBy.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit, OnDestroy {
  filterBy!: Filter
  subscription!: Subscription
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.subscription = this.productService.filterBy$.subscribe((filterBy:{range:string})=>{
      this.filterBy = filterBy})
  }
  onSetFilter() {
    console.log('filter:', this.filterBy);
    this.productService.setFilter({...this.filterBy})
  }
  ngOnDestroy():void{
    this.subscription.unsubscribe()
  }

}