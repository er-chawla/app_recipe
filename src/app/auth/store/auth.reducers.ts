import * as  AuthAction from './auth.action';

export interface AuthState {
  token: string;
  authenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  authenticated: false
};

export function authReducer(state = initialState, action: AuthAction.AuthAction) {
  switch (action.type) {
    case (AuthAction.SIGNUP):
    case (AuthAction.SIGNIN): {
      return {
        ...state,
        authenticated: true
      };
    }
    case (AuthAction.LOGOUT): {
      return {
        ...state,
        token: null,
        authenticated: false
      };
    }
    case (AuthAction.SET_TOKEN): {
      return {
        ...state,
        token: action.payload
      };
    }
    default:
      return state;
  }
}
