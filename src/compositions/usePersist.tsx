import { useState } from "react";
import { TaskData } from "./type";
export const usePersist = (_key: string, initValue: TaskData[] | undefined) => {
  const key = "hooks:" + _key;
  const value = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initValue;
    } catch (error) {
      console.log(error);
      return initValue;
    }
  };
  const setValue = (value: TaskData[]) => {
    try {
      setSavedValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };
  const [savedValue, setSavedValue] = useState(value);
  return [savedValue, setValue];
};
