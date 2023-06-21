import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL =
  'https://script.google.com/macros/s/AKfycbxISK9crejOQlXmszqjM0zQtncE2qvn-n_ZqHw3M-7yKKywTFq_Ag68ms9dgeZEXn206g/exec';

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

  filter(sheetName: string, value: string): Observable<any> {
    const params = new URLSearchParams({
      method: 'filter',
      params: JSON.stringify({
        sheetName,
        filter: value,
      }),
    });

    return this.http.get(`${API_URL}?${params.toString()}`);
  }
}
