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
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private injector = inject(EnvironmentInjector);
  constructor(private database: Database) {}

  public list(path: string): Observable<any> {
    const DATABASE_REFERENCE: DatabaseReference = ref(this.database, path);
    return listVal(DATABASE_REFERENCE);
  }
  public object(path: string): Observable<any> {
    const DATABASE_REFERENCE: DatabaseReference = ref(this.database, path);
    return runInInjectionContext(this.injector, () => {
      return objectVal(DATABASE_REFERENCE);
    });
  }

  getListByEqualTo<T = any>(
    path: string,
    field: string,
    value: string | number,
  ): Observable<T[]> {
    const DATABASE_REFERENCE: DatabaseReference = ref(this.database, path);
    const q = query(DATABASE_REFERENCE, orderByChild(field), equalTo(value));
    return listVal<T>(q);
  }

  public set(path: string, data: any) {
    const DATABASE_REFERENCE: DatabaseReference = ref(this.database, path);
    return set(DATABASE_REFERENCE, data);
  }
  public push(path: string, data: any) {
    const DATABASE_REFERENCE: DatabaseReference = ref(this.database, path);
    const newRef = push(DATABASE_REFERENCE);
    return set(newRef, data);
  }

  public update(path: string, data: any) {
    const DATABASE_REFERENCE: DatabaseReference = ref(this.database, path);
    return update(DATABASE_REFERENCE, data);
  }

  public on(path: string, callback: (data: any) => void) {
    const DATABASE_REFERENCE: DatabaseReference = ref(this.database, path);
    onValue(DATABASE_REFERENCE, (snapshot) => {
      callback(snapshot.val());
    });
  }

  public once(path: string, callback: (data: any) => void) {
    const DATABASE_REFERENCE: DatabaseReference = ref(this.database, path);
    get(DATABASE_REFERENCE).then((snapshot) => {
      callback(snapshot.val());
    });
  }

  public remove(path: string) {
    const DATABASE_REFERENCE: DatabaseReference = ref(this.database, path);
    return remove(DATABASE_REFERENCE);
  }
}
