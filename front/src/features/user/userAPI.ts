import axios from "axios";
import { auth, sessionPersistance } from "../../firebase";
import { UserDataType } from "./userSlice";

//ログイン
export const login = (email: string, password: string): void => {
  auth.setPersistence(sessionPersistance).then(() => {
    auth.signInWithEmailAndPassword(email, password).catch((e) => {
      console.error(e);
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
): Promise<UserDataType | void> => {
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
  const userData = { uid: uid, username: username, prefecture: prefecture };
  return new Promise((resolve, reject) => {
    axios
      .post("/users/add", { userData })
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        console.error(e);
        reject(null);
      });
  });
};

//mongoDBからユーザー情報取得
export const fetchUserData = (uid: string): Promise<UserDataType | null> => {
  return new Promise((resolve, reject) => {
    axios
      .post("/users", { uid })
      .then((res) => {
        if (res) {
          resolve(res.data);
        }
      })
      .catch((e) => {
        console.log(e);
        reject(null);
      });
  });
};
