import axios from "axios";
import { ThreadDataType } from "./threadSlice";

export const fetchThread = (): Promise<ThreadDataType[] | null> => {
  return axios
    .post("http://localhost:3001/threads/fetch-thread-all")
    .then((res) => {
      return res.data.threads;
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
};

export const createThread = (
  thread: ThreadDataType
): Promise<ThreadDataType | null> => {
  return axios
    .post("http://localhost:3001/threads/create-thread", { thread })
    .then((res) => {
      return res.data.newThread;
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
};

export const updateThread = (
  updatedThread: ThreadDataType
): Promise<ThreadDataType | null> => {
  return axios
    .post("http://localhost:3001/threads/update-thread", { updatedThread })
    .then((res) => {
      return res.data.updatedThread;
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
};
