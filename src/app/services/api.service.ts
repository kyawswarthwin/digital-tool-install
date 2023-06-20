import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL =
  'https://script.google.com/macros/s/AKfycbzRqLgulMun6RhtnOXfFHlUKt7r2X5-_BOjLqmZmqlnMp7f2rBggHsuUqW2DLg4d35ORg/exec';

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
