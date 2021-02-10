import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>(
  fromUser.usersFeatureKey
);

export const selectAllUsers = createSelector(
  selectUserState,
  fromUser.selectAll
);
