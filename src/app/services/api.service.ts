import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL =
  'https://script.google.com/macros/s/AKfycbyZQ_kDOVbfwG7RZWCbJjkcSSkZzdLBjARppljrWxgGk_ToCnEstnDmrd2qp-FzfN7ajw/exec';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  list(): Observable<any> {
    const params = new URLSearchParams({
      method: 'list',
    });

    return this.http.get(`${API_URL}?${params.toString()}`);
  }

  allItems(sheetName: string, filter: string): Observable<any> {
    const params = new URLSearchParams({
      method: 'allItems',
      params: JSON.stringify({
        sheetName,
        filter,
      }),
    });

    return this.http.get(`${API_URL}?${params.toString()}`);
  }

  itemGroups(sheetName: string): Observable<any> {
    const params = new URLSearchParams({
      method: 'itemGroups',
      params: JSON.stringify({
        sheetName,
      }),
    });

    return this.http.get(`${API_URL}?${params.toString()}`);
  }
}
