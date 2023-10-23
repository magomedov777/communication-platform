import { ActionsType, DialogsPageType } from "../../redux/store";
import { v1 } from "uuid";

const initialState: DialogsPageType = {
  dialogs: [
    { id: v1(), name: "Nicole" },
    { id: v1(), name: "Oleksii" },
    { id: v1(), name: "Andrew" },
    { id: v1(), name: "George" },
  ],
  messages: [
    { id: v1(), message: "Call me" },
    { id: v1(), message: "Hello World" },
    { id: v1(), message: "How much??" },
    { id: v1(), message: "Ok, by-by" },
  ],
};

export const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsType): DialogsPageType => {
  switch (action.type) {
    case "ADD-NEW-MESSAGE": {
      let newMessage = {
        id: v1(),
        message: action.newValue,
      };
      return {
        ...state,
        messages: [...state.messages, newMessage],
      };
    }
    default:
      return state;
  }
};

export type AddMessageType = ReturnType<typeof addMessageAC>;
export const addMessageAC = (newValue: string) => ({ type: "ADD-NEW-MESSAGE", newValue } as const);
