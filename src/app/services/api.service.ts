import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL =
  'https://script.google.com/macros/s/AKfycbxiNyWSIvWbbNOESz07jmjufurTqX_L6LUAvX7dorzfiw4CM0e692yk6sKmNuQk9OXX4g/exec';

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

  itemSubgroups(sheetName: string, group: string): Observable<any> {
    const params = new URLSearchParams({
      method: 'itemSubgroups',
      params: JSON.stringify({
        sheetName,
        group,
      }),
    });

    return this.http.get(`${API_URL}?${params.toString()}`);
  }
}
