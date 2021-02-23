import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { loadUsers } from './user.actions';
import * as selectors from './user.selectors';

@Injectable({
  providedIn: 'root',
})
export class UserStoreFacade {
  constructor(private store: Store) {}
  public users$ = this.store.pipe(select(selectors.selectAllUsers));
}
