const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const User = require("../models/Users");
const crypto = require('crypto');
const axios = require('axios');
const secretKey = crypto.randomBytes(32).toString('hex');
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
      const salt= await bcrypt.genSalt(10);
      const password=await bcrypt.hash(req.body.password,salt)
    try {
      
      await User.create({
        name: req.body.name,
        password:password,
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
      const isPasswordSame=await bcrypt.compare(req.body.password,userData.password)
      if(!isPasswordSame){
        return res.status(400).json({ errors:"Incorrect Password" });
      }
      const data = {
        user:{
          id:userData.id
        }
      }
      const authToken=jwt.sign(data,secretKey)
      return res.status(201).json({success:true,authToken:authToken,user: req.body });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
router.post('/getlocation', async (req, res) => {
  try {
      let lat = req.body.latlong.lat
      let long = req.body.latlong.long
      console.log(lat, long)
      let location = await axios
          .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
          .then(async res => {
              // console.log(`statusCode: ${res.status}`)
              console.log(res.data.results)
              // let response = stringify(res)
              // response = await JSON.parse(response)
              let response = res.data.results[0].components;
              console.log(response)
              let { village, county, state_district, state, postcode } = response
              return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode)
          })
          .catch(error => {
              console.error(error)
          })
      res.send({ location })

  } catch (error) {
      console.error(error.message)
      res.send("Server Error")

  }
})
module.exports = router;
