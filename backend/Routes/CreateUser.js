const express = require("express");
const router = express.Router();
const user = require("../model/User");
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtsecret = "gundetisaireddyfromsvnitlivesinpadkal"

router.post("/createuser",
    body('email', 'enter correct email').isEmail(),
    body('name', 'name should be of atleast 8 letters').isLength({ min: 8 }),
    body('password', 'password should be of atleast 8 letters').isLength({ min: 8 })
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt =await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt);
        try {
            await user.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secPassword
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })
router.post("/loginuser",
    body('email', 'enter correct email').isEmail(),
    body('password', 'password should be of atleast 8 letters').isLength({ min: 8 })
    ,
    async (req, res) => {
        let email = req.body.email;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let userData = await user.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "login with correct credentials" });
            }
            const pswdcompare = await bcrypt.compare(req.body.password,userData.password);
            if (!pswdcompare) {
                return res.status(400).json({ errors: "login with correct password" });
            }
            const data ={
                user:{
                    id : userData.id
                }
            }
            const authToken = jwt.sign(data,jwtsecret);
            return res.json({ success: true, authToken:authToken });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

module.exports = router;