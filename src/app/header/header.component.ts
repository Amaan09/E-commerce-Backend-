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
    this.productService.fetchCartSize();
    this.productService.cartSize.subscribe(res => {
      this.cartSize = res;
    }
    )
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

}
