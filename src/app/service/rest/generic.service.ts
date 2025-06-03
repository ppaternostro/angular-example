import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Abstract HTTP generics class whose implementations require two type
 * parameters. The first type parameter (T) represents the type returned
 * on all defined methods. The second type parameter (B) represents the
 * request body type for the 'create' method. Both these type parameters
 * will predominately be the same type except in rare instances when the
 * 'create' request body is a different type than the 'create' response
 * body.
 */
@Injectable({
  providedIn: 'root',
})
export abstract class GenericService<T, B> {
  constructor(public httpClient: HttpClient) {}

  // Types T and B used here
  protected create(url: string, object: B, options = {}): Observable<T> {
    return this.httpClient.post<T>(url, object, options);
  }

  protected read(url: string, options = {}): Observable<T> {
    return this.httpClient.get<T>(url, options);
  }

  protected update(url: string, object: T, options = {}): Observable<T> {
    return this.httpClient.put<T>(url, object, options);
  }

  protected updatePartial(url: string, object: T, options = {}): Observable<T> {
    return this.httpClient.patch<T>(url, object, options);
  }

  protected delete(url: string, options = {}): Observable<T> {
    return this.httpClient.delete<T>(url, options);
  }

  protected list(url: string, options = {}): Observable<T[]> {
    return this.httpClient.get<T[]>(url, options);
  }
}
