const express = require('express');
const router = express.Router();
const passport = require('passport');//passport sw imported
const passportConfig = require('../passport');//passport.js file imported

const JWT = require('jsonwebtoken');
const UserModel = require('../models/User');
const TodoModel = require('../models/Todo');

const bcrypt = require('bcrypt');


const { body, check, validationResult } = require('express-validator');
var obj = require('mongoose').Types.ObjectId;



const signToken = userID => {//To create token 
    return JWT.sign({
        iss: "NoobCoder",
        sub: userID
    }, "NoobCoder", { expiresIn: "1h" });
}

router.post('/register', (req, res) => {
    console.log("1")
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const username = req.body.username;
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    UserModel.findOne({ username }, (err, user) => {

        if (err) {
            console.log("3")
            res.send({ message: 'Error has occured', status: 500 })
        }

        if (user) {
            //console.log("30")
            res.send({ message: 'User already Exists', status: 401 });
        }

        else {
            console.log("4")
            const newUser = new UserModel({ username, password, cpassword });
            newUser.save((err, user) => {
                if (err) {
                    console.log("40")
                    res.send({ message: err, status: 500 })
                }

                else {

                    res.send({ message: 'User registered successfully', status: 200 })
                }

            });
        }

    });
});

router.get('/loginfail', (req, res) => {
    res.send({ isAuthenticated: '403' });
});
router.post('/login', passport.authenticate('local', { failureRedirect: '/loginfail', session: false }), (req, res) => {
    console.log("login api")
    if (req.isAuthenticated()) {
        const { _id, username } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: { username, token, _id } });


    }
    else {
        console.log("shit")
    }
});

router.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { username: "", role: "" }, success: true });
});

//To fetch list of all subadmin as per loggedin superadmin id
router.get('/todo_list/', (req, res) => {

    TodoModel.find((err, document) => {
        if (err)
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
        else {
            res.send(document);
        }
    });
});


router.post('/todo_insert', (req, res) => {
    console.log("kk")
    const name = req.body.name;
    const newUser = new TodoModel({ name });
    newUser.save((err, user) => {
        if (err) {

            res.send({ message: err, status: 500 })
        }

        else {

            res.send({ message: 'success', status: 200 })
        }

    });


});


router.get('/todo_delete/:id', (req, res) => {
    TodoModel.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.status(200).json({ subadmins: doc, status: true });
        }
        else {
            res.status(500).json({ status: false });
        }

    });
});


module.exports = router;