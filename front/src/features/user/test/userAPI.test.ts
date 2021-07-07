import React from "react";
import {
  login,
  logout,
  register,
  registerUserData,
  updateUserData,
} from "../userAPI";

test("registerUserData", () => {
  registerUserData("aaa", "aaaa", "北海道")
    .then((res) => {
      expect(res).toBe({});
    })
    .catch((e) => {
      expect(e).toBe("Network Error");
    });
});
test("updateUserData", () => {
  updateUserData("aaa", "dddd", "cddd", "ffff")
    .then((res) => {
      expect(res).toBe({});
    })
    .catch((e) => {
      expect(e).toBe("Network Error");
    });
});
test("login", () => {
  login("aaa", "aaaa")
    .then((res) => {
      expect(res).toBe({});
    })
    .catch((e) => {
      expect(e).toBe("Network Error");
    });
});
// test("logout", () => {
//     logout().catch(e => {
//       expect(e).toBe()
//   })
// });
test("register", () => {
  register("aaa", "aaaa")
    .then((res) => {
      expect(res).toBe({});
    })
    .catch((e) => {
      expect(e).toBe("Network Error");
    });
});
