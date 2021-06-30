var express = require("express");
var router = express.Router();
const Thread = require("../models/thread");
const mongoose = require('mongoose')

const cors = require('cors')

router.use(
  cors({
    origin: "http://localhost:3000", //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200, //レスポンスstatusを200に設定
  })
);

router.post("/create-thread", (req, res) => {
  console.log(req.body.thread);
  const newThread = {
    ...req.body.thread,
    _id: mongoose.Types.ObjectId(),
  };
  const thread = new Thread(newThread);
  thread
    .save()
    .then((response) => {
      console.log(response);
      res.header("Content-Type", "application/json; charset=utf-8");
      res.send({ newThread });
    })
    .catch((response) => {
      console.log(response);
      res.header("Content-Type", "application/json; charset=utf-8");
      res.send({ response });
    });
});

router.post("/fetch-thread-all", (req, res) => {
  Thread.find({})
    .sort({ 'date': 1 })
    .then((threads) => {
      console.log(threads);
      res.header("Content-Type", "application/json; charset=utf-8");
      res.send({ threads });
    });
});

router.post("/fetch-thread-user-only", (req, res) => {
  console.log(req.body.uid);
  const uid = req.body.uid;
  Thread.find({ uid: uid })
    .sort({ 'date': 1 })
    .then((threads) => {
      console.log(threads);
      res.header("Content-Type", "application/json; charset=utf-8");
      res.send({threads});
    });
});

router.post("/update-thread", (req, res) => {
  const threadToUpdate = req.body.updatedThread;
  console.log(threadToUpdate);
  Thread.findByIdAndUpdate(threadToUpdate._id, threadToUpdate, { new: true }).then(
    (updatedThread) => {
      res.header("Content-Type", "application/json; charset=utf-8");
      //アップデートされたthreadを返す
      res.send({ updatedThread });
    }
  );
});

router.post("/delete-thread", (req, res) => {
  const _id = req.body._id;
  Thread.findByIdAndDelete(_id).then((doc) => {
    res.header("Content-Type", "application/json; charset=utf-8");
    //このdocは使う必要なし
    res.send({ doc });
  });
});

module.exports = router;
