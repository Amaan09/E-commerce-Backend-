import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartSubscription: Subscription;
  cartSize = 0;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.cartSubscription = this.productService.cartSize.subscribe(count => {
      this.cartSize = count;
    })
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

}
