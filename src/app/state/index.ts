import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromUser from './user/user.reducer';
import * as fromGame from './game/game.reducer';

export interface State {
  [fromUser.usersFeatureKey]: fromUser.State;
  [fromGame.gameFeatureKey]: fromGame.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromUser.usersFeatureKey]: fromUser.reducer,
  [fromGame.gameFeatureKey]: fromGame.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
