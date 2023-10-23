import { ActionsType, PhotosType, ProfilePageType, ProfileUserType } from "../../redux/store";
import { profileAPI } from "../../api/api";
import { Dispatch } from "redux";
import { AppDispatch, AppStateType } from "../../app/redux-store";

const initialState: ProfilePageType = {
  posts: [
    { id: 1, message: "Hello", likesCount: 7 },
    { id: 2, message: "Hi, I am Software Engineer", likesCount: 9 },
    { id: 3, message: "My name is John", likesCount: 11 },
    { id: 4, message: "Hi There", likesCount: 18 },
    { id: 5, message: "Call me now", likesCount: 7 },
  ],
  profile: null,
  status: "",
};

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsType): ProfilePageType => {
  switch (action.type) {
    case "ADD-POST":
      let newPost = {
        id: 19,
        message: action.payload.newValue,
        likesCount: 0,
      };
      return { ...state, posts: [newPost, ...state.posts] };
    case "SET-USER-PROFILE": {
      return { ...state, profile: action.payload.profile };
    }
    case "SET-STATUS": {
      return { ...state, status: action.status };
    }
    default:
      return state;
  }
};

export type AddPostActionType = ReturnType<typeof addPost>;
export type UpdateNewPostTextType = ReturnType<typeof updateNewPostText>;
export type SetUserProfileType = ReturnType<typeof setUserProfile>;
export type SetStatusType = ReturnType<typeof setStatus>;
export type UpdateStatusType = ReturnType<typeof updateStatus>;
export type UpdatePhotoType = ReturnType<typeof updatePhotoSuccess>;

export const addPost = (newValue: string) => {
  return {
    type: "ADD-POST",
    payload: {
      newValue,
    },
  } as const;
};
export const updateNewPostText = (newText: string) => {
  return {
    type: "UPDATE-NEW-POST-TEXT",
    payload: {
      newText: newText,
    },
  } as const;
};
export const setUserProfile = (profile: ProfileUserType) => {
  return {
    type: "SET-USER-PROFILE",
    payload: {
      profile,
    },
  } as const;
};

export const setStatus = (status: string) => {
  return {
    type: "SET-STATUS",
    status,
  } as const;
};

export const updateStatus = (status: string) => {
  return {
    type: "UPDATE-STATUS",
    status,
  } as const;
};

export const updatePhotoSuccess = (photos: PhotosType) => {
  return {
    type: "UPDATE-PHOTO-SUCCESS",
    payload: {
      photos,
    },
  } as const;
};

export const getProfileTC = (userId: string) => async (dispatch: Dispatch) => {
  const result = await profileAPI.getProfile(userId);
  try {
    dispatch(setUserProfile(result.data));
  } catch (e) {}
};

export const getStatusTC = (userId: string) => async (dispatch: Dispatch) => {
  const result = await profileAPI.getStatus(userId);
  dispatch(setStatus(result.data));
};
export const updateStatusTC = (status: string) => async (dispatch: Dispatch) => {
  await profileAPI.updateStatus(status);
  dispatch(setStatus(status));
};
export const updatePhoto = (photo: File) => async (dispatch: Dispatch) => {
  try {
    const result = await profileAPI.updatePhoto(photo);
    if (result.data.resultCode === 0) {
      dispatch(updatePhotoSuccess(result.data.data.photos));
    }
  } catch (e) {}
};
export const updateProfile =
  (profile: ProfileUserType) => async (dispatch: AppDispatch, getState: () => AppStateType) => {
    const userId = getState().auth.id + "";
    try {
      const result = await profileAPI.updateProfile(profile);
      if (result.data.resultCode === 0) {
        dispatch(getProfileTC(userId));
      }
    } catch (e) {}
  };
