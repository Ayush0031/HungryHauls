const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/Users");
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Password length should be >5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        location: req.body.location,
      }).then(res.json({ success: true, user: req.body }));
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
router.post("/loginuser",
  [
    body("email").isEmail(),
    body("password", "Password length should be >5").isLength({ min: 5 }),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email=req.body.email;
    try {
      let userData = await User.findOne({email})
      if(!userData){
        return res.status(400).json({ errors:"Try Logging with valid credentials" });
      }
      if(req.body.password !==userData.password){
        return res.status(400).json({ errors:"Incorrect Password" });
      }
      return res.status(400).json({success:true,user: req.body });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
module.exports = router;
