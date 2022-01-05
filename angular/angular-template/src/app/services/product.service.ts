import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { data } from 'jquery';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
// import {product} from '';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  private _product$ = new BehaviorSubject<Product[]>([])
  public products$ = this._product$.asObservable()
  private _filterBy$ = new BehaviorSubject({ range: '' });
  public filterBy$ = this._filterBy$.asObservable()

  public async getProducts() {
    const products = await $.getJSON('../../assets/data/products.json', function(data){
      console.log('data', data);
    });
    var items:any = [];
    products.Stores.forEach((store:any) => {
      store.Products.forEach((product:any) => {
        items.push(product)
      });
    });
    const filterBy = this._filterBy$.getValue()
    if (filterBy.range) items = items.filter((product:Product)=> product.Price < parseInt(filterBy.range))
    console.log('items', items)
    this._product$.next(items)
    return items;
  }

  public setFilter(filterBy: any) {
    console.log('service setFilter -> filterBy', filterBy)
    this._filterBy$.next(filterBy)
    this.getProducts()

  }
}
