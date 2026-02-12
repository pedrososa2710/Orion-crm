import {
  inject,
  Injectable,
  EnvironmentInjector,
  runInInjectionContext,
} from '@angular/core';
import {
  Database,
  DatabaseReference,
  objectVal,
  listVal,
  ref,
  set,
  onValue,
  remove,
  push,
  query,
  orderByChild,
  equalTo,
  get,
  update,
} from '@angular/fire/database';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private injector = inject(EnvironmentInjector);

  constructor(private database: Database) {}

  list<T = any>(path: string): Observable<T[]> {
    if (!path) {
      return throwError(() => new Error('Path is required'));
    }
    const ref_ = ref(this.database, path);
    return listVal<T>(ref_).pipe(catchError((err) => this.handleError(err)));
  }

  object<T = any>(path: string): Observable<T> {
    if (!path) {
      return throwError(() => new Error('Path is required'));
    }
    const ref_ = ref(this.database, path);
    return runInInjectionContext(this.injector, () =>
      objectVal<T>(ref_).pipe(catchError((err) => this.handleError(err))),
    );
  }

  getListByEqualTo<T = any>(
    path: string,
    field: string,
    value: string | number,
  ): Observable<T[]> {
    if (!path || !field) {
      return throwError(() => new Error('Path and field are required'));
    }
    const ref_ = ref(this.database, path);
    const q = query(ref_, orderByChild(field), equalTo(value));
    return listVal<T>(q).pipe(catchError((err) => this.handleError(err)));
  }

  set(path: string, data: any): Promise<void> {
    if (!path) {
      return Promise.reject(new Error('Path is required'));
    }
    const ref_ = ref(this.database, path);
    return set(ref_, data).catch((err) => {
      console.error('Error setting data:', err);
      return Promise.reject(err);
    });
  }

  push(path: string, data: any): Promise<string> {
    if (!path) {
      return Promise.reject(new Error('Path is required'));
    }
    const ref_ = ref(this.database, path);
    const newRef = push(ref_);
    return set(newRef, data)
      .then(() => newRef.key || '')
      .catch((err) => {
        console.error('Error pushing data:', err);
        return Promise.reject(err);
      });
  }

  update(path: string, data: any): Promise<void> {
    if (!path) {
      return Promise.reject(new Error('Path is required'));
    }
    const ref_ = ref(this.database, path);
    return update(ref_, data).catch((err) => {
      console.error('Error updating data:', err);
      return Promise.reject(err);
    });
  }

  on(path: string, callback: (data: any) => void): void {
    if (!path) {
      console.error('Path is required for on() method');
      return;
    }
    const ref_ = ref(this.database, path);
    onValue(ref_, (snapshot) => {
      callback(snapshot.val());
    });
  }

  once(path: string, callback: (data: any) => void): void {
    if (!path) {
      console.error('Path is required for once() method');
      return;
    }
    const ref_ = ref(this.database, path);
    get(ref_)
      .then((snapshot) => {
        callback(snapshot.val());
      })
      .catch((err) => {
        console.error('Error getting data:', err);
      });
  }

  remove(path: string): Promise<void> {
    if (!path) {
      return Promise.reject(new Error('Path is required'));
    }
    const ref_ = ref(this.database, path);
    return remove(ref_).catch((err) => {
      console.error('Error removing data:', err);
      return Promise.reject(err);
    });
  }

  private handleError(err: any): Observable<never> {
    console.error('Database error:', err);
    return throwError(() => err);
  }
}
