import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL =
  'https://script.google.com/macros/s/AKfycbylxw_j1e5yOAydNW2LUBDBm_NFv-hn-8Vvn-Mv_cROB4BWZ_Gnsutqe3GofA2O06yDdw/exec';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  filter(value: string): Observable<any> {
    const params = new URLSearchParams({
      filter: value,
    });

    return this.http.get(`${API_URL}?${params.toString()}`);
  }
}
