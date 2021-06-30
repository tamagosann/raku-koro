var express = require("express");
var router = express.Router();
const User = require("../models/user");
const mongoose = require('mongoose')

const cors = require('cors')

router.use(
  cors({
    origin: "http://localhost:3000", //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200, //レスポンスstatusを200に設定
  })
);

router.post("/create-user", (req, res) => {
  console.log(req.body.user);
  const createUser = {
    ...req.body.user,
    _id: mongoose.Types.ObjectId(),
  };
  const newUser = new User(createUser);

  newUser
    .save()
    .then((response) => {
      console.log(response);
      res.header("Content-Type", "application/json; charset=utf-8");
      res.send(createUser);
    })
    .catch((response) => {
      console.log(response);
      res.header("Content-Type", "application/json; charset=utf-8");
      res.send({ response });
    });
});

router.post("/fetch-user", (req, res) => {
  console.log(req.body);
  const uid = req.body.uid
  User.findOne({uid}).then((user) => {
    console.log(user);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(user);
  });
});

router.post("/update-user", (req, res) => {
  console.log(req.body.updatedUser)
  const userToUpdate = req.body.updatedUser;
  console.log(userToUpdate);
  User.findByIdAndUpdate(userToUpdate._id, userToUpdate, { new: true }).then(
    (updatedUser) => {
      res.header("Content-Type", "application/json; charset=utf-8");
      console.log(updatedUser)
      //新しいuser情報のオブジェクトを返している。
      res.send({ updatedUser });
    }
  );
});

router.post("/delete-user", (req, res) => {
  const _id = req.body._id;
  User.findByIdAndDelete(_id).then(
    (doc) => {
      res.header("Content-Type", "application/json; charset=utf-8");
      //このdocは特に使う必要なし
      //消したuserが入っている
      res.send({ doc });
    }
  );
});



module.exports = router;
