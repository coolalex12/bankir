import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as UserActions from './user.actions';
import { Gamer } from '@app/models';

export const usersFeatureKey = 'users';

export interface State extends EntityState<Gamer> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Gamer> = createEntityAdapter<Gamer>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

// export const initialState: State = adapter.setAll(
//   [{ id: '123', name: 'Вася' }],
//   adapter.getInitialState()
// );

export const reducer = createReducer(
  initialState,
  on(UserActions.addUser, (state, action) =>
    adapter.addOne(action.user, state)
  ),
  on(UserActions.upsertUser, (state, action) =>
    adapter.upsertOne(action.user, state)
  ),
  on(UserActions.addUsers, (state, action) =>
    adapter.addMany(action.users, state)
  ),
  on(UserActions.upsertUsers, (state, action) =>
    adapter.upsertMany(action.users, state)
  ),
  on(UserActions.updateUser, (state, action) =>
    adapter.updateOne(action.user, state)
  ),
  on(UserActions.updateUsers, (state, action) =>
    adapter.updateMany(action.users, state)
  ),
  on(UserActions.deleteUser, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(UserActions.deleteUsers, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(UserActions.loadUsers, (state, action) =>
    adapter.setAll(action.users, state)
  ),
  on(UserActions.clearUsers, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
