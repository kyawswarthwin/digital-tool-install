import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL =
  'https://script.google.com/macros/s/AKfycbyagK2TWoSk7iS0Wf56hyqZjH4pWViV5t3I01b6ndfIpY39QEvwX8_a2w_KFsG5OnhUFg/exec';

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
}
