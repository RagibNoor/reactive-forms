import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import {error} from '@angular/compiler/src/util';

@Injectable()
export class StockInventoryService {
  constructor(
    private http: HttpClient
  ) {
  }

  getCartItem(): Observable<any> {
  return this.http.get('http://localhost:3000/cart').pipe(
    map((response: HttpResponse<any>) => response),
    catchError((err: any) => throwError(err.json()))
  );
  }
  getProducts(): Observable<any> {
    return this.http.get('http://localhost:3000/products').pipe(
      map((response: HttpResponse<any>) => response),
      catchError((err: any) => throwError(err.json()))
    );
  }
}
