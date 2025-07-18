import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home {
  products: Product[] = [
    { name: 'iPhone 14', price: 999, description: 'هاتف قوي من أبل' },
    { name: 'Samsung S24', price: 899, description: 'أداء ممتاز وكاميرا رائعة' },
    { name: 'Xiaomi 13T', price: 599, description: 'قيمة ممتازة مقابل السعر' },
  ];
}

interface Product {
  name: string;
  price: number;
  description: string;
}
