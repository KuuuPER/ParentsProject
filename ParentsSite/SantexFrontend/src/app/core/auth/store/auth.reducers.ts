import * as AuthActions from './auth.actions';
import { AppState } from '../../../store/app.reducers';

export interface FeatureState extends AppState{
    products: State;
}

export interface State{
 token: string;
 authenticated: boolean;
}

const initialState: State = {
    token: null,
    authenticated: false
}

export function authReducer(state: State = initialState, action: AuthActions.AuthActions){
    switch (action.type) {
        case AuthActions.SIGNIN:
        return {
            ...state,
            authenticated: true
        };
        case AuthActions.SET_TOKEN:
        return{
            ...state,
            token: action.payload
        };
        default:
            return state;
    }
}