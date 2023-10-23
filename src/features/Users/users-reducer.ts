import { ActionsType } from "../../redux/store";
import { Dispatch } from "redux";
import { usersAPI } from "../../api/api";

export type UsersType = {
  id: number;
  photos: {
    small: string;
    large: string;
  };
  followed: boolean;
  status: string;
  name: string;
  location: {
    city: string;
    country: string;
  };
};

export type StateType = {
  users: UsersType[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: number[];
};

const initialState: StateType = {
  users: [],
  pageSize: 30,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

export const usersReducer = (state: StateType = initialState, action: ActionsType): StateType => {
  switch (action.type) {
    case "FOLLOW": {
      return {
        ...state,
        users: state.users.map((el) =>
          el.id === action.payload.id ? { ...el, followed: !action.payload.followed } : el
        ),
      };
    }
    case "SET-USERS": {
      return { ...state, users: action.payload.users };
    }
    case "SET-CURRENT-PAGE": {
      return { ...state, currentPage: action.payload.newCurrentPage };
    }
    case "SET-TOTAL-COUNT": {
      return { ...state, totalUsersCount: action.payload.count };
    }
    case "SET-PRELOAD": {
      return { ...state, isFetching: action.payload.onOff };
    }
    case "TOGGLE-IS-FOLLOWING": {
      return {
        ...state,
        followingInProgress: action.payload.disabled
          ? [...state.followingInProgress, action.payload.id]
          : state.followingInProgress.filter((id) => id !== action.payload.id),
      };
    }
    default:
      return state;
  }
};

export type FollowACType = ReturnType<typeof follow>;
export type SetUsersACType = ReturnType<typeof setUsers>;
export type SetCurrentPageACType = ReturnType<typeof setCurrentPage>;
export type SetTotalCountACType = ReturnType<typeof setTotalCount>;
export type PreloadACType = ReturnType<typeof preload>;
export type ToggleIsFollowingType = ReturnType<typeof toggleIsFollowing>;

export const follow = (id: number, followed: boolean) => {
  return {
    type: "FOLLOW",
    payload: {
      id,
      followed,
    },
  } as const;
};

export const setUsers = (users: UsersType[]) => {
  return {
    type: "SET-USERS",
    payload: {
      users,
    },
  } as const;
};

export const setCurrentPage = (newCurrentPage: number) => {
  return {
    type: "SET-CURRENT-PAGE",
    payload: {
      newCurrentPage,
    },
  } as const;
};
export const setTotalCount = (count: number) => {
  return {
    type: "SET-TOTAL-COUNT",
    payload: {
      count,
    },
  } as const;
};
export const preload = (onOff: boolean) => {
  return {
    type: "SET-PRELOAD",
    payload: {
      onOff,
    },
  } as const;
};

export const toggleIsFollowing = (disabled: boolean, id: number) => {
  return {
    type: "TOGGLE-IS-FOLLOWING",
    payload: {
      disabled,
      id,
    },
  } as const;
};

export const getUsersTC = (page: number, pageSize: number) => async (dispatch: Dispatch) => {
  dispatch(preload(true));
  dispatch(setCurrentPage(page));
  try {
    const response = await usersAPI.fetchUsers(page, pageSize);
    dispatch(setUsers(response.data.items));
    dispatch(setTotalCount(response.data.totalCount));
    dispatch(preload(false));
  } catch (e) {}
};

export const pageNavigationTC = (page: number, pageSize: number) => async (dispatch: Dispatch) => {
  dispatch(preload(true));
  dispatch(setCurrentPage(page));
  try {
    const response = await usersAPI.fetchUsers(page, pageSize);
    dispatch(setUsers(response.data.items));
    dispatch(preload(false));
  } catch (e) {}
};

export const unFollowTC = (id: number, followed: boolean) => (dispatch: Dispatch) => {
  usersAPI.unFollow(id).then((data) => {
    if (data.resultCode === 0) {
      dispatch(follow(id, followed));
    }
    dispatch(toggleIsFollowing(false, id));
  });
};

export const followTC = (id: number, followed: boolean) => (dispatch: Dispatch) => {
  usersAPI.follow(id).then((data) => {
    if (data.resultCode === 0) {
      dispatch(follow(id, followed));
    }
    dispatch(toggleIsFollowing(false, id));
  });
};
