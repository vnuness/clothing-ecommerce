
import { UnknownAction } from 'redux'
import { UserData } from '../../utils/firebase'
import { signInSuccess, signOutSuccess, signOutFailed, signUpFailed, signInFailed } from './user.action';

export type UserState = {
  readonly currentUser: UserData | null,
  readonly isLoading: boolean,
  readonly error: Error | null
}

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null
}

export const userReducer = (state = INITIAL_STATE, action: UnknownAction): UserState => {

  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload
    }
  }

  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null }
  }

  if (signInFailed.match(action) || signOutFailed.match(action) || signUpFailed.match(action)) {
    return { ...state, error: action.payload };
  }

  return state;
}