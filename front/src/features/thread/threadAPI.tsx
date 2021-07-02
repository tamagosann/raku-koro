import axios from "axios";
import { ThreadDataType } from "./threadSlice";
import { SERVER_URI,THREADS_TABLE_URI } from "../../apis/mongoDB";

export const fetchThread = (): Promise<ThreadDataType[] | null> => {
  return axios
    .post(`${SERVER_URI + THREADS_TABLE_URI}/fetch-thread-all`)
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
    .post(`${SERVER_URI + THREADS_TABLE_URI}/create-thread`, { thread })
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
    .post(`${SERVER_URI + THREADS_TABLE_URI}/update-thread`, { updatedThread })
    .then((res) => {
      return res.data.updatedThread;
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
};

export const deleteThread = (
  _id: string
): Promise<ThreadDataType | null> => {
  return axios
    .post(`${SERVER_URI + THREADS_TABLE_URI}/delete-thread`, { _id })
    .then((res) => {
      console.log(res.data.doc);
      return res.data.doc;
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
};
