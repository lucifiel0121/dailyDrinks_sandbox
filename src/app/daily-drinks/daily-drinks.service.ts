import { Injectable } from '@angular/core';
interface OrderInfo {
  name: string;
  price: number;
  notes?: string;
  drinkDetails: Detail;
  orderStatus: orderStatus;
}
interface Detail {
  drink: string;
  sugar: string;
}
enum orderStatus {
  isOrder,
  isPaid,
}
@Injectable({
  providedIn: 'root',
})
export class DailyDrinksService {
  constructor() {}

  orderInfo = [
    {
      name: 'Ashe',
      price: 50,
      note: '小珍珠',
      drinkDetails: { drink: '珍珠奶茶', sugar: '微糖' },
    },
    {
      name: 'angel',
      price: 40,
      note: '不加牛奶',
      drinkDetails: { drink: '奶茶', sugar: '微糖' },
    },
    {
      name: 'clown',
      price: 50,
      note: '溫的',
      drinkDetails: { drink: '綠茶', sugar: '微糖' },
    },
  ];
}
