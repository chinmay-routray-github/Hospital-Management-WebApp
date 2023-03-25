import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data:JSON):Observable<any>{
    return this.http.post('http://127.0.0.1:8000/user/login', data)
  }

  docLogin(data:JSON):Observable<any>{
    return this.http.post('http://127.0.0.1:9000/doc/login', data)
  }
}
