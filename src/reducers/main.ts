import { SET, SET_LENGTH } from "../constants/main";
import { ICounter } from "../models/counter";

export interface IState {
  arrayLength: number;
  counters: ICounter[];
}

type Action = any;

const initialState: IState = {
  arrayLength: 5,
  counters: []
};

export default function reducer(
  state: IState = initialState,
  action: Action
): IState {
  switch (action.type) {
    case SET:
      return {
        ...state,
        counters: action.payload
      };
    case SET_LENGTH:
      return {
        ...state,
        arrayLength: action.payload
      };
    default:
      return state;
  }
}
