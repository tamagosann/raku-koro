import axios from "axios";
import { auth, sessionPersistance } from "../../apis/firebase";
import { UserDataType } from "./userSlice";
import { SERVER_URI, USERS_TABLE_URI } from "../../apis/mongoDB";

//ログイン
export const login = (
  email: string,
  password: string
): Promise<string | void> => {
  return new Promise((resolve, reject) => {
    auth.setPersistence(sessionPersistance).then(async () => {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          resolve();
        })
        .catch((e) => {
          reject(e.message);
        });
    });
  });
};

//ログアウト
export const logout = () => {
  auth.signOut();
};

//新規登録
export const register = (
  email: string,
  password: string,
  username: string,
  prefecture: string
): Promise<UserDataType | null> => {
  return new Promise((resolve, reject) => {
    auth.setPersistence(sessionPersistance).then(() => {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (res) => {
          if (res.user) {
            let uid = res.user.uid;
            const data = await registerUserData(uid, username, prefecture);
            if (data) {
              resolve(data);
            } else {
              reject(null);
            }
          }
        })
        .catch((e) => {
          console.error(e);
          reject(null);
        });
    });
  });
};

//mongoDBへユーザー情報新規登録
export const registerUserData = (
  uid: string,
  username: string,
  prefecture: string
): Promise<UserDataType | null> => {
  const user = { uid: uid, username: username, prefecture: prefecture };
  return axios
    .post(`${SERVER_URI + USERS_TABLE_URI}/create-user`, { user })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
};

//mongoDBへユーザー情報更新
export const updateUserData = (
  _id: string,
  uid: string,
  username: string,
  prefecture: string
): Promise<UserDataType | null> => {
  const updatedUser = {
    _id: _id,
    uid: uid,
    username: username,
    prefecture: prefecture,
  };
  return axios
    .post(`${SERVER_URI + USERS_TABLE_URI}/update-user`, { updatedUser })
    .then((res) => {
      return res.data.updatedUser;
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
};

//mongoDBからユーザー情報取得
export const fetchUserData = (uid: string): Promise<UserDataType | null> => {
  return axios
    .post(`${SERVER_URI + USERS_TABLE_URI}/fetch-user`, { uid })
    .then((res) => {
      if (res) {
        return res.data;
      }
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
};
