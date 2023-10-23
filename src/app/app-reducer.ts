import { AppDispatch } from "./redux-store";
import { authTC } from "./auth-reducer";

export type AuthType = {
  initialized: boolean;
};

const initialState: AuthType = {
  initialized: false,
};

export const appReducer = (state = initialState, action: ActionType): AuthType => {
  switch (action.type) {
    case "SET-INITIALIZED": {
      return {
        ...state,
        initialized: action.initialized,
      };
    }
    default:
      return state;
  }
};

type ActionType = setUsersDataType;

type setUsersDataType = ReturnType<typeof setInitialized>;

export const setInitialized = (initialized: boolean) => {
  return {
    type: "SET-INITIALIZED",
    initialized,
  } as const;
};

export const setInitializedApp = () => async (dispatch: AppDispatch) => {
  await dispatch(authTC());
  dispatch(setInitialized(true));
};
