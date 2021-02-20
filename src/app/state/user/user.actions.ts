import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Gamer } from '@app/models';


export const loadUsers = createAction(
  '[User/API] Load Users',
  props<{ users: Gamer[] }>()
);

export const addUser = createAction(
  '[User/API] Add User',
  props<{ user: Gamer }>()
);

export const upsertUser = createAction(
  '[User/API] Upsert User',
  props<{ user: Gamer }>()
);

export const addUsers = createAction(
  '[User/API] Add Users',
  props<{ users: Gamer[] }>()
);

export const upsertUsers = createAction(
  '[User/API] Upsert Users',
  props<{ users: Gamer[] }>()
);

export const updateUser = createAction(
  '[User/API] Update User',
  props<{ user: Update<Gamer> }>()
);

export const updateUsers = createAction(
  '[User/API] Update Users',
  props<{ users: Update<Gamer>[] }>()
);

export const deleteUser = createAction(
  '[User/API] Delete User',
  props<{ id: string }>()
);

export const deleteUsers = createAction(
  '[User/API] Delete Users',
  props<{ ids: string[] }>()
);

export const clearUsers = createAction(
  '[User/API] Clear Users'
);
