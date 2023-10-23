import {
  AddPostActionType,
  SetStatusType,
  SetUserProfileType,
  UpdateNewPostTextType,
  UpdatePhotoType,
  UpdateStatusType,
} from "../features/Profile/profile-reducer";
import { AddMessageType } from "../features/Dialogs/dialogs-reducer";
import {
  FollowACType,
  PreloadACType,
  SetCurrentPageACType,
  SetTotalCountACType,
  SetUsersACType,
  ToggleIsFollowingType,
} from "../features/Users/users-reducer";

export type ActionsType =
  | AddPostActionType
  | UpdateNewPostTextType
  | AddMessageType
  | FollowACType
  | SetUsersACType
  | SetCurrentPageACType
  | SetTotalCountACType
  | PreloadACType
  | SetUserProfileType
  | ToggleIsFollowingType
  | SetStatusType
  | UpdateStatusType
  | UpdatePhotoType;

export type StoreType = {
  _state: RootStateType;
  subscribe: (observer: (state: RootStateType) => void) => void;
  _callSubscriber: (state: RootStateType) => void;
  getState: () => RootStateType;
  dispatch: DispatchType;
};

export type DispatchType = (action: ActionsType) => void;

export type PostType = {
  id: number;
  message: string;
  likesCount: number;
};

export type DialogType = {
  id: string;
  name: string;
};

export type MessagesType = {
  id: string;
  message: string;
};

export type ProfilePageType = {
  posts: Array<PostType>;
  profile: ProfileUserType | null;
  status: string;
};

export type ProfileUserType = {
  aboutMe: string;
  contacts: {
    github: string;
    facebook: string;
    twitter: string;
    instagram: string;
    website: string;
  };
  lookingForJob: boolean;
  LastName: string;
  userId: number;
  photos: PhotosType;
};

export type PhotosType = {
  small: string;
  large: string;
};

export type DialogsPageType = {
  dialogs: Array<DialogType>;
  messages: Array<MessagesType>;
};

export type RootStateType = {
  profilePage: ProfilePageType;
  dialogsPage: DialogsPageType;
};
