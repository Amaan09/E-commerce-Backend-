import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {
  productsSubscription: Subscription;
  constructor(private productService: ProductService) { }

  products = []

  ngOnInit(): void {
    this.productsSubscription = this.productService.fetchProducts().subscribe(res => {
      this.products = res
    })
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

}
