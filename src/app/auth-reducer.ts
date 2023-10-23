import { Dispatch } from "redux";
import { authApi, loginApi, profileAPI, settingApi } from "../api/api";
import { AppDispatch } from "./redux-store";
import { stopSubmit } from "redux-form";

export type AuthType = {
  id: null | number;
  login: null | string;
  email: null | string;
  isAuth: boolean;
  captcha: string | null;
};

type LoginType = {
  id: null | number;
  login: null | string;
  email: null | string;
  isAuth: boolean;
};

const initialState: AuthType = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
  captcha: null,
};

export const authReducer = (state = initialState, action: ActionType): AuthType => {
  switch (action.type) {
    case "SET-USER-DATA": {
      return {
        ...state,
        ...action.payload.data,
      };
    }
    case "SET-CAPTCHA": {
      return {
        ...state,
        captcha: action.payload.captcha,
      };
    }
    default:
      return state;
  }
};

type ActionType = SetUsersDataType | SetCaptchaType;

type SetUsersDataType = ReturnType<typeof setUsersData>;
type SetCaptchaType = ReturnType<typeof setCaptcha>;

export const setUsersData = (data: LoginType) => {
  return {
    type: "SET-USER-DATA",
    payload: {
      data,
    },
  } as const;
};

const setCaptcha = (captcha: string) => {
  return {
    type: "SET-CAPTCHA",
    payload: { captcha },
  } as const;
};

export const authTC = () => async (dispatch: Dispatch) => {
  const result = await authApi.auth();
  result.data.resultCode === 0 && dispatch(setUsersData({ ...result.data.data, isAuth: true }));
};

export const login =
  (email: string, password: string, rememberMe: boolean, captcha: string | null) => async (dispatch: AppDispatch) => {
    try {
      const result = await loginApi.login(email, password, rememberMe, captcha);
      if (result.data.resultCode === 0) {
        dispatch(authTC());
      } else {
        if (result.data.resultCode === 10) {
          dispatch(getCaptcha());
        }
        dispatch(stopSubmit("login", { _error: result.data.messages[0] }));
      }
    } catch (e) {}
  };
export const logout = () => async (dispatch: AppDispatch) => {
  try {
    const result = await loginApi.logout();
    result.data.resultCode === 0 &&
      dispatch(
        setUsersData({
          id: null,
          login: null,
          email: null,
          isAuth: false,
        })
      );
  } catch (e) {}
};
export const getCaptcha = () => async (dispatch: AppDispatch) => {
  try {
    const result = await settingApi.captcha();
    dispatch(setCaptcha(result.data.url));
  } catch (e) {}
};
