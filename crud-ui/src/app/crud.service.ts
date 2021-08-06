import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private url: string = 'http://localhost:3000';
  // private headers = new HttpHeaders().set('Content-type', 'application-json');

  constructor(private http: HttpClient) {}
  getList() {
    return this.http.get(this.url + '/users');
  }
  addUser(jsonData: any) {
    return this.http.post(this.url, +'/add', jsonData);
  }
  deleteUser(id: any) {
    return this.http.delete(`${this.url}/users/${id}`);
  }
  getCurrentUser(id: number) {
    return this.http.get(`${this.url}/users/${id}`);
  }
  updateUser(id: any, jsonData: any) {
    return this.http.put(`${this.url}/users/${id}`, jsonData);
  }
}
