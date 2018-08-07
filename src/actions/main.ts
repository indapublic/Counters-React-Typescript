import { Dispatch } from "redux";

import { load as counterLoad } from "../api/counter";
import { SET, SET_LENGTH } from "../constants/main";
import { ICounter } from "../models/counter";
import { IRootState } from "../reducers/";

import { recalcArray } from "../utils/";

export const setLength = (arrayLength: number) => ({
  payload: arrayLength,
  type: SET_LENGTH
});

export const setCounters = (counters: ICounter[]) => ({
  payload: recalcArray(counters).map((counter: ICounter) => ({
    ...counter,
    changed: false
  })),
  type: SET
});

/**
 * Загрузка счетчиков.
 */
export const loadCounters = () => async (
  dispatch: Dispatch<any>,
  getState: () => IRootState
) => {
  const { arrayLength } = getState().main;
  dispatch(setCounters(await counterLoad(arrayLength)));
};

/**
 * Установка случайных данных.
 */
export const setRandomData = () => async (dispatch: Dispatch<any>) => {
  dispatch(loadCounters());
};

/**
 * Изменение счетчика.
 */
export const setCounter = (counter: ICounter) => async (
  dispatch: Dispatch<any>,
  getState: () => IRootState
) => {
  const { counters } = getState().main;
  dispatch(
    setCounters(
      counters.map(
        (c: ICounter) =>
          c.uid === counter.uid ? { ...counter, changed: true } : c
      )
    )
  );
};

/**
 * Удаление счетчика.
 */
export const removeCounter = (counter: ICounter) => async (
  dispatch: Dispatch<any>,
  getState: () => IRootState
) => {
  const { counters } = getState().main;
  dispatch(
    setCounters(counters.filter((c: ICounter) => c.uid !== counter.uid))
  );
};
