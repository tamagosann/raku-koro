var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log("connection check");
  res.json({ status: "OK" });
});
router.post("/", function (req, res, next) {
  let kariData = {
    uid: req.body.uid,
    username: "testname",
    prefecture: "testPref",
  };
  console.log(kariData);
  res.json(kariData);
});

router.post("/add", function (req, res, next) {
  console.log(req.body.userData);
  res.json(req.body.userData);
});

module.exports = router;
