import { Action } from '@ngrx/store';

// export const TRY_SIGNUP = 'TRY_SIGNUP';
// export const SIGNUP = 'SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNIN = 'SIGNIN';
export const SET_TOKEN = 'SET_TOKEN';
// export const LOGOUT = 'LOGOUT';

// export class TrySignup implements Action {
//   readonly type = TRY_SIGNUP;

//   constructor(public payload: {username: string, password: string}) {}
// }

// export class Signup implements Action {
//   readonly type = SIGNUP;
// }

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;

  constructor(public payload: {username: string, password: string}) {}
}

export class Signin implements Action {
  readonly type = SIGNIN;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {}
}

// export class Logout implements Action {
//   readonly type = LOGOUT;
// }

export type AuthActions = Signin | SetToken | TrySignin;

// export type AuthActions = Signup | Signin | Logout | SetToken | TrySignup | TrySignin;
