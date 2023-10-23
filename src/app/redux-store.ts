import { AnyAction, applyMiddleware, combineReducers, createStore } from "redux";
import { profileReducer } from "../features/Profile/profile-reducer";
import { dialogsReducer } from "../features/Dialogs/dialogs-reducer";
import { usersReducer } from "../features/Users/users-reducer";
import { authReducer } from "./auth-reducer";
import thunk, { ThunkDispatch } from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import { appReducer } from "./app-reducer";

export const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export type AppStateType = ReturnType<typeof reducers>;

export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>;
export default store;
