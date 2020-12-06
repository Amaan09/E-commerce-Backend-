import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductService {
    constructor(private http: HttpClient) {}
    cartSize = new Subject<number>();
    total = new Subject<number>();
    cartChanged = new Subject<any>();

    fetchProducts() {
        return this.http.get<[]>(
            'http://127.0.0.1:5000/products'
        )
    }

    fetchProduct(id: string) {
        return this.http.get<{ name: string, _id: { $oid: string }, price: number, category: string, imagePath: string }>(
            'http://127.0.0.1:5000/products/'+ id
        )
    } 

    storeProduct(cartItem: {product_id: string, size: string, quantity: number }) {
        this.http.post(
            'http://127.0.0.1:5000/cart/5fcd0da5b6bc1c7c6be296b9',
            cartItem
        ).subscribe(res => {
            this.fetchCartSize();
        })
    }

    fetchCartSize() {
        this.http.get<{count: number}>(
            'http://127.0.0.1:5000/cart/5fcd0da5b6bc1c7c6be296b9/count'
        ).subscribe(res => {
            this.cartSize.next(res.count);
        })
    }

    // fetchCartItems() {
    //     return this.http.get<any>('http://127.0.0.1:5000/cart/5fc9dc298e843616fc4ca1c0')
    // }

    fetchCartItems() {
        this.http.get<any>(
            'http://127.0.0.1:5000/cart/5fcd0da5b6bc1c7c6be296b9'
        ).subscribe(res => {
            this.cartChanged.next(res);
        })
    }

    deleteCartProduct(data: {product_id: string}) {
        this.http.put(
            'http://127.0.0.1:5000/cart/5fcd0da5b6bc1c7c6be296b9',
            data
        ).subscribe(res => {
            this.fetchCartSize();
            this.fetchCartItems();
        })
    }

    genBill(products: any) {
        let t = 0;
        products.forEach(element => {
            t += (element.price * element.quantity)
        });
        this.total.next(t);
    }

    deleteCartProducts() {
        this.http.delete(
            'http://127.0.0.1:5000/cart/5fcd0da5b6bc1c7c6be296b9'
        ).subscribe(res => {
            this.cartSize.next(0);
        })
    }
}