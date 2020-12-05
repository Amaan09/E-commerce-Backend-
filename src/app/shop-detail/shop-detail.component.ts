import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params} from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css']
})
export class ShopDetailComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) cartForm: NgForm;
  shopDetailSubscription: Subscription;
  constructor(private productService: ProductService,
    private route: ActivatedRoute) {}
  
  id: string;
  product: { _id: { $oid: string }, name: string, price: number, category: string, imagePath: string};
  quantity = 1;
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params.id;
      }
    )
    this.shopDetailSubscription = this.productService.fetchProduct(this.id).subscribe(res => {
      this.product = res
    })
  }

  increaseQuantity() {
    this.cartForm.setValue({
      size: this.cartForm.value.size,
      quantity: +this.cartForm.value.quantity + 1
    })
  }

  decreaseQuantity() {
    this.cartForm.setValue({
      size: this.cartForm.value.size,
      quantity: +this.cartForm.value.quantity - 1
    })
  }

  onSubmit() {
    const product_id = this.id;
    const size = this.cartForm.value.size;
    const quantity = +this.cartForm.value.quantity;
    const cartItem = {
      product_id: product_id,
      size: size,
      quantity: quantity
    }
    this.productService.storeProduct(cartItem);
    this.productService.fetchCartSize();
  }

  ngOnDestroy() {
    this.shopDetailSubscription.unsubscribe();
  }

}
