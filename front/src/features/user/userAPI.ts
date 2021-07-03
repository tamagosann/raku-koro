import axios from "axios";
import { auth, sessionPersistance } from "../../apis/firebase";
import { UserDataType } from "./userSlice";
import { SERVER_URI, USERS_TABLE_URI } from "../../apis/mongoDB";

export const connectionTest = () =>
  axios.get(`${SERVER_URI + USERS_TABLE_URI}`).catch((e) => {
    throw new Error(e);
  });

//ログイン
export const login = (email: string, password: string): Promise<void> => {
  return new Promise((resolve, reject) =>
    auth.setPersistence(sessionPersistance).then(() => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          resolve();
        })
        .catch((e) => {
          reject(e);
        });
    })
  );
};

//ログアウト
export const logout = () => {
  auth.signOut();
};

//新規登録
export const register = (email: string, password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    auth.setPersistence(sessionPersistance).then(() => {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          if (res.user) {
            resolve(res.user.uid);
          } else {
            reject();
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  });
};

//mongoDBへユーザー情報新規登録
export const registerUserData = (
  uid: string,
  username: string,
  prefecture: string
): Promise<UserDataType> => {
  const user = { uid: uid, username: username, prefecture: prefecture };
  return new Promise((resolve, reject) => {
    axios
      .post(`${SERVER_URI + USERS_TABLE_URI}/create-user`, { user })
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

//mongoDBへユーザー情報更新
export const updateUserData = (
  _id: string,
  uid: string,
  username: string,
  prefecture: string
): Promise<UserDataType> => {
  const updatedUser = {
    _id: _id,
    uid: uid,
    username: username,
    prefecture: prefecture,
  };
  return new Promise((resolve, reject) => {
    axios
      .post(`${SERVER_URI + USERS_TABLE_URI}/update-user`, { updatedUser })
      .then((res) => {
        resolve(res.data.updatedUser);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

//mongoDBからユーザー情報取得
export const fetchUserData = (uid: string): Promise<UserDataType> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${SERVER_URI + USERS_TABLE_URI}/fetch-user`, { uid })
      .then((res) => {
        if (res.data) {
          resolve(res.data);
        } else {
          reject();
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
};
